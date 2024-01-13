const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");

const dev = process.env.NODE_ENV != "production";
const nextServer = next({ dev }); // automáticamente referencia si actualmente se está en ' desarrollo ' o ' producción '
const handle = nextServer.getRequestHandler();

dotenv.config({path: "./config.env"}); // Error fix 2)
const app = require("./app");

// conexión de la DB
const DB = process.env.DATABASE?.replace("<PASSWORD>", process.env.DATABASE_PASSWORD); // esto se encarga de enviar la contraseña actual; Error fix ' 1) '

mongoose.connect(DB, { // se pasa la DB y la configuración particular para el package usado
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log("DB connection successful!"));

const port = 3000; // obs: se usará para desarrollo y prod.

nextServer.prepare().then(() => { // se define tanto el server (backend) como el frontend
    app.get("*", (req, res) => { // backend
        return handle(req, res);
    });

    app.listen(port, () => { // frontend
        console.log(`App Running on port ${port}...`);
    });
});

/* SOLUCIÓN A ERRORES
1) " Cannot read properties of undefined (reading 'replace') "
    -> agregar '?' al objeto que se le aplica el  ' replace ' (' Optional Chaining ') 

2) " The `uri` parameter to `openUri` must be a string, got "undefined" "
    -> se le agrega el ' .env ' a la ruta
*/