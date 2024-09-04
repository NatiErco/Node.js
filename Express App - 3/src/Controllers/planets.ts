
import { Request, Response } from "express";
import Joi from "joi";

type Planet = {
    id: number;
    name: string;
  };
  
  type Planets = Planet[];
  
  let planets: Planets = [
    { id: 1, name: "Earth" },
    { id: 2, name: "Mars" },
  ];

  
  const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets); // Envía una respuesta con un código de estado HTTP 200 (OK) y un objeto JSON
  }

  const getOneById = (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    if (planet) {
        res.status(200).json(planet); // Envía el planeta encontrado con un código de estado 200
      } else {
        res.status(404).json({ message: "Planet not found" }); // Envía un mensaje de error si el planeta no existe
      }
    }

    const planetSchema = Joi.object({
      id: Joi.number().integer().required(),
      name: Joi.string().required(),
    });

    const create = (req: Request, res: Response) => {
        const { id, name } = req.body;
        const NewPlanet: Planet = { id, name };

        
        planets = [...planets, NewPlanet];
    
      
        res.status(201).json({ message: "The planet was created." });
      }

      const updateById = (req: Request, res: Response) => {
        const { id } = req.params;
        const { name } = req.body;
        planets = planets.map((p) => p.id === Number(id) ? ({...p,name}) : p);
        
        res.status(200).json({ message: "The planet was updated." });
      }
      const deleteById = (req: Request, res: Response) => {
        const { id } = req.params;
        console.log(planets);
        planets = planets.filter((p) => p.id !== Number(id)) //  solo se mantendrán los planetas cuyo ID no coincide con el ID especificado en la URL.
        
        res.status(200).json({ message: "The planet was deleted." });
      }

      export { getAll, getOneById, create, updateById, deleteById };