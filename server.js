const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();

// CONFIGURACIONES
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// CONEXIÓN A MONGODB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Mongo conectado"))
.catch(err => console.log("Error Mongo:", err));

// CONFIGURACIÓN CLOUDINARY
cloudinary.config({

  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET

});

// ALMACENAMIENTO CLOUDINARY
const storage = new CloudinaryStorage({

  cloudinary: cloudinary,

  params: {

    folder: "lavanda",

    allowed_formats: ["jpg", "png", "jpeg"]

  }

});

// MULTER
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
        ? req.file.path
        : ""

    });

    await nuevo.save();

    res.send("Guardado correctamente");

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
