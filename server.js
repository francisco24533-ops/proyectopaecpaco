const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ✅ conexión usando variable de entorno (Render)
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongo conectado"))
.catch(err=>console.log("Error Mongo:", err));

// ✅ modelo
const Registro = mongoose.model("Registro", {
  alumno: String,
  altura: Number,
  fecha: String
});

// ✅ guardar
app.post("/registros", async (req, res) => {
  try {
    const nuevo = new Registro(req.body);
    await nuevo.save();
    res.send("Guardado");
  } catch (error) {
    res.status(500).send("Error al guardar");
  }
});

// ✅ obtener
app.get("/registros", async (req, res) => {
  try {
    const datos = await Registro.find();
    res.json(datos);
  } catch (error) {
    res.status(500).send("Error al obtener datos");
  }
});

// ✅ puerto dinámico (Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));
