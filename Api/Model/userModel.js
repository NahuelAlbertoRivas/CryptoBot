const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // necesario para encriptar la información antes de almacenarla en la DB; esta estrategia se lleva a cabo ante posibles intentos de hacking

const userSchema = new mongoose.Schema({ // esta almacenará la estructura general de la info. que se pretenda recuperar a través de Mongo
    name: {
        type: String,
        required: [true, "Please, tell us your name"], // se pide al usuario que ingrese su nombre
    },
    email: {
        type: String,
        required: [true, "Please, provide your email"],
        unique: true,
        lowercase: true,
    },
    membershipType: { // se pretende que sea con suscripciones
        type: String,
        lowercase: true,
        default: "notMember",
    },
    role: { // por ej. admin o user en primer instancia
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Please, provide your password"],
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please, confirm your password"],
        validate: {
            validator: function (el){
                return el === this.password;
            },
            message: "Passwords don't match"
        }
    },
});

// Middlewares

userSchema.pre("save", async function(next){ // se usa el método ' pre ' justamente para realizar verificaciones antes de guardar directamente en la DB
    // esta fn. se ejecuta sólo si la contraseña fue modificada previamente, de no ser así se continúa con el sig. middleware
    if(!this.isModified("password")) return next();

    // encriptamos la contraseña realizando un hash mediante ' bcrypt '
    this.password = await bcrypt.hash(this.password, 12); // le pasamos el campo que queremos encriptar; el segundo parámetro corresponde a  "cuán complejo" se encriptará el string del primer parámetro (obs: a mayor número, más tiempo requerirá -debido a su costo computacional-) [el valor 12 es un estándar de la industria, para este caso dejaremos tal valor]

    // eliminamos el campo ' passwordconfirm ', ya que no será de utilidad almacenarlo en la DB
    this.passwordConfirm = undefined;
    next(); // finalmente, pasamos al sig. mid.
});

// segunda opción
userSchema.pre("save", function(next){
    if(!this.isModified("password") || this.isNew) return next(); // la segunda cond. pretende verificar si la pass en nueva

    this.passwordChangeAt = Date.now() - 1000 ; // si el usuario cambió la pass, tenemos que guardar la info. en la DB
    next();
});

// tercer opción
userSchema.pre(/^find/, function(next){ // esta vez pasamos a verificar una condición que definimos como ' find '
    if(!this.isModified("password") || this.isNew) return next(); // la segunda cond. pretende verificar si la pass en nueva
    // cuando un usuario produzca alguna query en algún endpoint, el método -' find '- usado chequea la misma
    this.find({ active: { $ne: false } }); // método especial de mongoose, permite cambiar el estado del usuario de ' avtiva ' a ' false ' o ' true ', en el que se puede controlar la accesibilidad del usuario
    next();
});

// método para verificar contraseñas
userSchema.methods.correctPassword = async function (
    candidatePassword, // contraseña que inserta el user
    userPassword // contraseña almacenada en la DB (obs: encriptada)
){
    return await bcrypt.compare(candidatePassword, userPassword); // el segundo parámetro que recibe es el encriptado, ver definición de la fn.
};

// fn. simplemente para verificar y cambiar (en caso de corresponder) el timestamp en que se produjo un cambio de pass
userSchema.methods.passwordChangeAfter = function(JWTTimestamp){ // cuando el usuario crea la cuenta, se tiene que enviar el ' JW Token ', el cual tiene toda la info. sobre la autenticación
    if(this.passwordChangeAt){ // entonces, si existe este campo en el esquema del usuario, significa que efectivamente cambió la contraseña
        const changeTimestamp = parseInt( 
            this.passwordChangeAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changeTimestamp; // se compara entre el timestamp en que se ejecutó el cambio, contra el último almacenado en la DB, a fin de retornar true en caso de que se haya producido todo ok
    }
    // por defecto se retorna ' false ', lo que significa que no hubo cambios
    return false;
}

const User = mongoose.model("User", userSchema);

module.exports = User;