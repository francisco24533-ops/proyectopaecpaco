const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ✅ conexión Mongo correcta
mongoose.connect("mongodb+srv://francisco24533_db_user:paco@cluster0.p74517w.mongodb.net/miDB?retryWrites=true&w=majority")
.then(()=>console.log("Mongo conectado"))
.catch(err=>console.log(err));

// ✅ MODELO CORREGIDO (lavanda)
const Registro = mongoose.model("Registro", {
  alumno: String,
  altura: Number,
  fecha: String
});

// ✅ GUARDAR
app.post("/registros", async (req, res) => {
  const nuevo = new Registro(req.body);
  await nuevo.save();
  res.send("Guardado");
});

// ✅ OBTENER
app.get("/registros", async (req, res) => {
  const datos = await Registro.find();
  res.json(datos);
});

// ⚠️ IMPORTANTE para Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor corriendo"));