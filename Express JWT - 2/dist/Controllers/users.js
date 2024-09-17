var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dotenv from "dotenv";
dotenv.config();
import { db } from "../Controllers/db.js";
import jwt from "jsonwebtoken";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db.one(`SELECT * FROM users WHERE username=$1`, username);
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
        const token = jwt.sign(payload, SECRET);
        yield db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);
        res.status(200).json({ id: user.id, username, token });
    }
    else {
        res.status(400).json({ message: "username or password incorrect" });
    }
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username);
    if (user) {
        res.status(400).json({ message: "username already in use" });
    }
    else {
        const { id } = yield db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, password]);
        res.status(201).json({ message: "user created successfully" });
    }
});
export { login, signup };
