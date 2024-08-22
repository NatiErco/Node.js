// Utilice el REPL de Node.js para enumerar los métodos proporcionados por el módulo criptográfico principal de Node.js. Utilice uno de estos métodos para generar un ID aleatorio.

const crypto = require('crypto');
// console.log(Object.keys(crypto)); // Muestra los métodos del módulo crypto

// Usamos esta opcion para la mayoria de los casos donde necesito un identificador con un formato estandar dada su legibilidad.
const randomid2 = crypto.randomUUID();
console.log(randomid2);

// Usamos esta opcion en casos especificos, donde no es importante el identificador.
const randomid = crypto.randomBytes(16).toString('hex'); // Genera un ID aleatorio
console.log(randomid); // Imprime por consola el ID generado






