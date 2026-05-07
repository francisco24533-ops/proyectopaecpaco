const express = require("express");
app.use("/uploads", express.static("uploads"));

// conexión Mongo
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongo conectado"))
.catch(err=>console.log(err));

// configuración de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// modelo
const Registro = mongoose.model("Registro", {
  alumno: String,
  altura: Number,
  fecha: String,
  imagen: String
});

// guardar registro con imagen
app.post("/registros", upload.single("imagen"), async (req, res) => {

  const nuevo = new Registro({
    alumno: req.body.alumno,
    altura: req.body.altura,
    fecha: req.body.fecha,
    imagen: req.file ? "/uploads/" + req.file.filename : ""
  });

  await nuevo.save();

  res.send("Guardado");
});

// obtener registros
app.get("/registros", async (req, res) => {

  const datos = await Registro.find();

  res.json(datos);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo");
});