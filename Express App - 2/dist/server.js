import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import Joi from "joi";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
let planets = [
    { id: 1, name: "Earth" },
    { id: 2, name: "Mars" },
];
app.use(morgan("dev"));
app.use(express.json()); // Aceptar JSON del cliente
// Defimos una ruta que responde con la lista de planetas
app.get("/api/planets", (req, res) => {
    res.status(200).json(planets); // Envía una respuesta con un código de estado HTTP 200 (OK) y un objeto JSON
});
// Ruta que responde con un planeta específico basado en su id
app.get("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    if (planet) {
        res.status(200).json(planet); // Envía el planeta encontrado con un código de estado 200
    }
    else {
        res.status(404).json({ message: "Planet not found" }); // Envía un mensaje de error si el planeta no existe
    }
});
const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
});
app.post("/api/planets", (req, res) => {
    const { id, name } = req.body;
    const NewPlanet = { id, name };
    const validatedNewPlanet = planetSchema.validate(NewPlanet);
    if (validatedNewPlanet.error) {
        return res.status(400).json({ message: "validatedNewPlanet.error" });
    }
    else {
        planets = [...planets, NewPlanet];
        res.status(201).json({ message: "The planet was created." });
    }
});
app.put("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((p) => (p.id === Number(id) ? Object.assign(Object.assign({}, p), { name }) : p));
    res.status(200).json({ message: "The planet was updated." });
});
app.delete("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    console.log(planets);
    planets = planets.filter((p) => p.id !== Number(id)); //  solo se mantendrán los planetas cuyo ID no coincide con el ID especificado en la URL.
    res.status(200).json({ message: "The planet was deleted." });
});
// Inicia el servidor y hace que la aplicación escuche en el puerto especificado (3000).
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
