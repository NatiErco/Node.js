

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
