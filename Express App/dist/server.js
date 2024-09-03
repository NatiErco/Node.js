import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json()); // Aceptar JSON del cliente
let planets = [
    { id: 1, name: "Earth" },
    { id: 2, name: "Mars" },
];
// Defimos una ruta que responde con la lista de planetas
app.get('/api/planets', (req, res) => {
    res.status(200).json(planets); // Envía una respuesta con un código de estado HTTP 200 (OK) y un objeto JSON
});
// Ruta que responde con un planeta específico basado en su id
app.get('/api/planets/:id', (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    if (planet) {
        res.status(200).json(planet); // Envía el planeta encontrado con un código de estado 200
    }
    else {
        res.status(404).json({ message: 'Planet not found' }); // Envía un mensaje de error si el planeta no existe
    }
});
// Inicia el servidor y hace que la aplicación escuche en el puerto especificado (3000).
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
