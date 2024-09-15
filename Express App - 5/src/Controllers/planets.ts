import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");

console.log(db);

const setupDb = async () => {
  // Crear la tabla 'planets' si no existe
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
       id SERIAL NOT NULL PRIMARY KEY ,
       name TEXT NOT NULL,
       image TEXT
  )
  `);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
};

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

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets`);
  res.status(200).json(planets); // Envía una respuesta con un código de estado HTTP 200 (OK) y un objeto JSON
};

const getOneById =  async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id));
  if (planet) {
    res.status(200).json(planet); // Envía el planeta encontrado con un código de estado 200
  } else {
    res.status(404).json({ message: "Planet not found" }); // Envía un mensaje de error si el planeta no existe
  }
};


const planetSchema = Joi.object({
  // id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const create = async  (req: Request, res: Response) => {
  const { name } = req.body;
  const NewPlanet = { name };
  const validatedNewPlanet = planetSchema.validate(NewPlanet);

  if (validatedNewPlanet.error) {
    return res.status(400).json({message: validatedNewPlanet.error.details[0].message });
  } else {
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    res.status(201).json({ message: "The planet was created." });
  }
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;


  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);

  res.status(200).json({ message: "The planet was updated." });

};
const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  await db.none(`DELETE FROM planets WHERE id=$1`,[id]);

  res.status(200).json({ message: "The planet was deleted." });
};

const createImage = async (req: Request, res: Response) => {
  console.log(req.file);
  const { id } = req.params;
  const fileName = req.file?.path;
  if (fileName) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName]);
    res.status(201).json({ message: "The planet image was created." });
  } else {
    res.status(404).json({ message: "Planet image not found" }); 
  }

};

export { getAll, getOneById, create, updateById, deleteById, createImage };
