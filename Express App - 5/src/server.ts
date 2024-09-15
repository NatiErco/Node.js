import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import { getAll, getOneById, create, updateById, deleteById, createImage} from "./Controllers/planets.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"./uploads")
  },
  filename: (req,file,cb)=>{
    cb(null, file.originalname)
  }
})
const uploads = multer ({storage})

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
// app.use(express.json()); // Aceptar JSON del cliente

// Defimos una ruta que responde con la lista de planetas
app.get("/api/planets", getAll);
// Ruta que responde con un planeta específico basado en su id
app.get("/api/planets/:id", getOneById);
app.post("/api/planets", create);
app.put("/api/planets/:id", updateById);
app.delete("/api/planets/:id", deleteById);

app.post("/api/planets/:id/image", uploads.single("image"),createImage);

// Inicia el servidor y hace que la aplicación escuche en el puerto especificado (3000).
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
