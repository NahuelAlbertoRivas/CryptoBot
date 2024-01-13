// acá se desarrollará lógica de registro, login, etc.

const jwt = require("jsonwebtoken"); // componente que permite crear tokens para la autenticación (éstos se almacenarán en cookies, y es lo que se recuperará para el login y verificación)
const User = require("../Model/userModel");

// generación del token
const signToken = (id)=> { // userId
    return jwt.sign({ id }, process.env.JWT_SECRET, { // usamos ' JWT_SECRET ', definida en ' config.env ', para crear el token
        expiresIn: process.env.JWT_EXPIRES_IN, // se define cuándo caduca el token (' JWT_EXPIRES_IN ' también definida en ' config.env ')
    });
};

// creación y envío del token, se ejecuta cuando el usuario ingresa o crea una cuenta
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id) // se genera el token asociado al usuario

    res.cookie("jwt", token, { // configuración cookie
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), // se multiplica para poder convertir a segundos
        httpOnly: true, // esta y la línea de abajo setean la versión que tomará la cookie según el protocolo sea seguro o inseguro
        secure: req.secure || req.headers["x-forwarded-proto"] == "https", // ver documentación acerca de " cooking storage " para mayor comprensión del método seguido
    });

    // se elimina la contraseña de la salida para no exponerla, ya que se envía toda la info. del usuario
    user.password = undefined;

    res.status(statusCode).json({
        status: "success", // el usuario ingresa/se registra de manera correcta
        token,
        data:{ // se envía toda la info. del usuario
            user,
        },
    });
};

exports.signUp = async (req, res, next) => {
    const newUser = await User.create({ // cuando el usuario provee su info., la misma está disponible en el ' body ' del endpoint
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });


    createSendToken(newUser, 201, req, res);
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // se verifica si ingresaron el email y la contraseña
    if(!email || !password){
        res.status(400).json({
                status: "fail",
                message: "Please, check the entries"
        });
    }

    // se verifica si el usuario existe y la contraseña
    const user = await User.findOne({ email }).select("+password"); // ' findOne ', proporcionado por mongoose, permite hallar coincidencias respecto del mail ingresado; luego, se debe recuperar la contraseña desde la DB para verificar, la cual obtenemos mediante ' select() '

    if(!user || !(await user.correctPassword(password, user.password))){
        res.status(401).json({
            status: "fail",
            message: "Incorrect email or password",
        });
    }
    // si todo está ok, entonces se setea el token al usuario y realiza el login
    createSendToken(user, 200, req, res);
};

exports.buyMembership = async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.body.userID, {
            membershipType: req.body.membershipType,
        }, {
            new: true,
            runValidators: true, // se pretende ejecutar toda validación definida para el modelo
        }
    );
    
    res.status(200).json({ // se envía el objeto con la info. actualizada
        title: "Your account",
        user: updatedUser,
    });
}