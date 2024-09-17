import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { db } from "../Controllers/db.js";
import jwt from "jsonwebtoken"

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await db.one(`SELECT * FROM users WHERE username=$1`, username);

  // verifica si el usuario existe y si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos.
  if (user && user.password === password) {
  // Se crea el payload (es la información que se incluirá en el token JWT) con el ID y el nombre de usuario del usuario autenticado.  
    const payload = {
    id: user.id,
    username,    
    };
   // Asegúrate de que SECRET esté definido
   const { SECRET = "" } = process.env;

   if (!SECRET) {
     return res.status(500).json({ message: "Secret key is missing" });
   }

// Crea un token JWT usando el payload y la clave secreta (SECRET). Este token se utilizará para autenticar al usuario en futuras solicitudes.

    const token = jwt.sign(payload, SECRET)

    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token])
    res.status(200).json({ id: user.id, username, token});
  } else {
    res.status(400).json({ message: "username or password incorrect" });
  }
};

const signup = async (req: Request, res: Response) => {
 const { username, password } = req.body;

 const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username);

 if (user) {
  res.status(400).json({ message: "username already in use" });  
 } else {
  const {id} =  await db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,[username, password]);
 
  res.status(201).json({ message: "user created successfully" });
}


}

export { login, signup };
