const express = require("express");
const cors = require("cors");

// para configuración del user model
const userRouter = require("./Api/Routers/userRouter");

// middleware
const app = express();
app.use(express.json({ limit: "100kb" })); // si no se establece esto, no es posible almacenar info. en la DB; ' limit ' indica cuán grande puede ser el archivo que el usuario sube, en este caso 100KB

app.use(cors());
app.options("*", cors()); // se proporciona como objeto global

// routers
app.use("/api/v1/user", userRouter);

module.exports = app;