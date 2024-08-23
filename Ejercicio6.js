import http from "node:http";

  const server = http.createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");

  const jsonResponseBody = JSON.stringify({ location: "Earth" });

  response.end(jsonResponseBody);
});

server.listen(4000, () => {
  console.log(`Server running at http://localhost:4000`);
});

