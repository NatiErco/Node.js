import Joi from "joi";
let planets = [
    { id: 1, name: "Earth" },
    { id: 2, name: "Mars" },
];
const getAll = (req, res) => {
    res.status(200).json(planets); // Envía una respuesta con un código de estado HTTP 200 (OK) y un objeto JSON
};
const getOneById = (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    if (planet) {
        res.status(200).json(planet); // Envía el planeta encontrado con un código de estado 200
    }
    else {
        res.status(404).json({ message: "Planet not found" }); // Envía un mensaje de error si el planeta no existe
    }
};
const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
});
const create = (req, res) => {
    const { id, name } = req.body;
    const NewPlanet = { id, name };
    planets = [...planets, NewPlanet];
    res.status(201).json({ message: "The planet was created." });
};
const updateById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((p) => p.id === Number(id) ? (Object.assign(Object.assign({}, p), { name })) : p);
    res.status(200).json({ message: "The planet was updated." });
};
const deleteById = (req, res) => {
    const { id } = req.params;
    console.log(planets);
    planets = planets.filter((p) => p.id !== Number(id)); //  solo se mantendrán los planetas cuyo ID no coincide con el ID especificado en la URL.
    res.status(200).json({ message: "The planet was deleted." });
};
export { getAll, getOneById, create, updateById, deleteById };
