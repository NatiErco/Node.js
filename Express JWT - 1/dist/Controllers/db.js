var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pgPromise from "pg-promise";
const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");
console.log(db);
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Crear las tablas 'planets' y 'users'
        yield db.none(`
    DROP TABLE IF EXISTS planets;
    DROP TABLE IF EXISTS users;

    CREATE TABLE planets (
       id SERIAL NOT NULL PRIMARY KEY ,
       name TEXT NOT NULL,
       image TEXT
  );
       CREATE TABLE users (
       id SERIAL NOT NULL PRIMARY KEY ,
       username TEXT NOT NULL,
       password TEXT NOT NULL,
       token TEXT
       );
  `);
        // Insertar datos en las tablas
        yield db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
        yield db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
        yield db.none(`INSERT INTO users (username, password) VALUES ('Natalia', '1234')`);
    }
    catch (error) {
        console.error("Error al configurar la base de datos:", error);
    }
});
setupDb();
export { db };
