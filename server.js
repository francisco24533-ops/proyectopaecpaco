const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

// CONFIGURACIONES
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// CONEXIÓN MONGODB
mongoose.connect("mongodb+srv://francisco24533_db_user:paco@cluster0.p74517w.mongodb.net/miDB?retryWrites=true&w=majority")
.then(() => console.log("Mongo conectado"))
.catch(err => console.log("Error Mongo:", err));

// CONFIGURACIÓN IMÁGENES
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }

});

const upload = multer({ storage });

// MODELO
const Registro = mongoose.model("Registro", {

  alumno: String,
  altura: Number,
  fecha: String,
  imagen: String

});

// GUARDAR REGISTRO
app.post("/registros", upload.single("imagen"), async (req, res) => {

  try {

    const nuevo = new Registro({

      alumno: req.body.alumno,
      altura: req.body.altura,
      fecha: req.body.fecha,
      imagen: req.file
        ? "/uploads/" + req.file.filename
        : ""

    });

    await nuevo.save();

    res.send("Guardado");

  } catch (error) {

    console.log(error);

    res.status(500).send("Error al guardar");

  }

});

// OBTENER REGISTROS
app.get("/registros", async (req, res) => {

  try {

    const datos = await Registro.find();

    res.json(datos);

  } catch (error) {

    console.log(error);

    res.status(500).send("Error al obtener datos");

  }

});

// PUERTO
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Servidor corriendo en puerto " + PORT);

});