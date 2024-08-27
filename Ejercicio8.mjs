// Método fs.writeFile:

// fs.writeFile('archivo.txt', contenido, (error) => { ... });

// Este método toma tres argumentos:
// 1) El nombre del archivo ('archivo.txt').
// 2) El contenido que se desea escribir.
// 3) Una función callback que solo contiene un parametro (err) y se ejecuta cuando la operación ha finalizado, ya sea con éxito o con error.

import * as fs from "node:fs";

fs.writeFile("archivo.txt", "Hello World!", function (err) {
  if (err) {
    console.error("Ocurrió un error:", err);
    return;
  }
  console.log("El archivo ha sido guardado exitosamente.");
});

// Otra manera:

// import {whiteFile} from 'node:fs';

// const contenido = "Hello, World!";

//   writeFile("archivo.txt", contenido, (err) => {
//   if (err) {
//     console.error("Ocurrió un error:", err);
//   } else {
//     console.log("El archivo ha sido guardado exitosamente.");
//   }
// });
