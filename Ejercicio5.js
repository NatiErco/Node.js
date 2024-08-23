/// Our HTTP server sends an HTML response body. Replace the text in the HTML with your own message. Run the server and use your web browser to test your changes.

// Imports the Node.js core http module (or with node:http).
// Creates an HTTP server with the http.createServer method.
// Set the response status code to 200
// Sets the response header: Content-Type: text/html
// Sends an HTML response body containing any message.
// Make the server listen to the port 3000

  import http from "node:http";

  const server = http.createServer((require, response) => {
  console.log("request received");
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  response.end("<html><body><h1>He creado mi primer servidor</h1></body></html>");
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
