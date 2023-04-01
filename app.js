const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer();

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});