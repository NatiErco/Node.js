function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

async function getResults() {

    const players = ["Tina", "Jorge", "Julien"]; 
  
    for (const player of players) { // Iterar sobre cada jugador
      try {
        // Esperar el resultado de luckyDraw para cada jugador
        const result = await luckyDraw(player);
        console.log(result); // Imprimir el resultado si la promesa se resuelve
      } catch (error) {
        console.error(error.message); // Imprimir el mensaje de error si la promesa se rechaza
      }
    }
  }
  
  getResults();

  // Conclusion: Bucle for...of: Es útil para manejar promesas de manera secuencial.

// Métodos Alternativos (map y Promise.all/Promise.allSettled): Son mejores para manejar promesas en paralelo, permitiendo una ejecución más rápida si no es necesario que las operaciones se completen en un orden específico.

  