const { EventEmitter } = require("node:events"); // EventEmitter es una clase que permite que un objeto emita eventos y que otros objetos escuchen esos eventos y respondan a ellos.

// Esta funcion crea y devuelve un nuevo objeto EventEmitter.
function createNewsFeed() {
  const emitter = new EventEmitter();

  setInterval(() => {
    // Se utiliza setInterval para ejecutar una función anónima cada 1000 milisegundos .
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  setTimeout(() => {
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  return emitter;
}

const newsFeed = createNewsFeed();

// Oyente para "newsEvent"
newsFeed.on("newsEvent", (data) => {
  console.log(data);
});

// Oyente para "breakingNews"
newsFeed.on("breakingNews", (data) => {
    console.log(data);
});

// Oyente para "error"
newsFeed.on("error", (error) => {
    console.log(error);
});
