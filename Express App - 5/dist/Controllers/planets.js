var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from "joi";
import pgPromise from "pg-promise";
const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");
console.log(db);
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    // Crear la tabla 'planets' si no existe
    yield db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
       id SERIAL NOT NULL PRIMARY KEY ,
       name TEXT NOT NULL,
       image TEXT
  )
  `);
    yield db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
});
setupDb();
// type Planet = {
//   id: number;
//   name: string;
// };
// type Planets = Planet[];
// let planets: Planets = [
//   { id: 1, name: "Earth" },
//   { id: 2, name: "Mars" },
// ];
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets`);
    res.status(200).json(planets); // Envía una respuesta con un código de estado HTTP 200 (OK) y un objeto JSON
});
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    if (planet) {
        res.status(200).json(planet); // Envía el planeta encontrado con un código de estado 200
    }
    else {
        res.status(404).json({ message: "Planet not found" }); // Envía un mensaje de error si el planeta no existe
    }
});
const planetSchema = Joi.object({
    // id: Joi.number().integer().required(),
    name: Joi.string().required(),
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const NewPlanet = { name };
    const validatedNewPlanet = planetSchema.validate(NewPlanet);
    if (validatedNewPlanet.error) {
        return res.status(400).json({ message: validatedNewPlanet.error.details[0].message });
    }
    else {
        yield db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
        res.status(201).json({ message: "The planet was created." });
    }
});
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    yield db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
    res.status(200).json({ message: "The planet was updated." });
});
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db.none(`DELETE FROM planets WHERE id=$1`, [id]);
    res.status(200).json({ message: "The planet was deleted." });
});
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.file);
    const { id } = req.params;
    const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (fileName) {
        db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName]);
        res.status(201).json({ message: "The planet image was created." });
    }
    else {
        res.status(404).json({ message: "Planet image not found" });
    }
});
export { getAll, getOneById, create, updateById, deleteById, createImage };
