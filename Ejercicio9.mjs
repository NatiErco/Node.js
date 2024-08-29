function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random())); // Se define una constante win que determina aleatoriamente si el jugador gana o pierde. Math.random() genera un número entre 0 y 1; Math.round() lo redondea a 0 o 1; Boolean() convierte ese 0 o 1 a false o true.

    process.nextTick(() => { //  añade una función al "loop de eventos" de Node.js, para ejecutarse en la siguiente iteración.
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

// Ejecucion Paralela 
const players = ["Joe", "Caroline", "Sabrina"];

// Se utiliza map() para iterar sobre cada jugador en el arreglo players.
const promises = players.map((player) =>
  luckyDraw(player) // Para cada jugador, llama a la función luckyDraw(player) y maneja la promesa resultante.
    .then((result) => { // Si la promesa se resuelve (el jugador gana), imprime el mensaje de victoria y devuelve el resultado.
      console.log(result);
      return result;
    })
    .catch((error) => { //Si la promesa se rechaza (el jugador pierde), imprime el mensaje de error y devuelve null.
      console.error(error.message);
      return null;
    })
);

Promise.all(promises) // se utiliza para esperar a que todas las promesas se completen y maneja cualquier error que ocurra en el proceso.
  .then((results) => {
    console.log("Todos los resultados han sido procesados.");
  })
  .catch((error) => {
    console.error(
      "Se produjo un error en alguna de las promesas:",
      error.message
    );
  });

  // Conclusion: Cada promesa tiene su propio manejo de then y catch, lo que permite imprimir los resultados individuales (ganar o perder) a medida que cada promesa se resuelve o es rechazada.

