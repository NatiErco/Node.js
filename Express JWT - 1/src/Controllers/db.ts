import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");

console.log(db);

const setupDb = async () => {
  try {
    // Crear las tablas 'planets' y 'users'
    await db.none(`
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
    await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
    await db.none(
      `INSERT INTO users (username, password) VALUES ('Natalia', '1234')`
    );
  } catch (error) {
    console.error("Error al configurar la base de datos:", error);
  }
};

setupDb();

export { db };
