const http = require('http');
const posts = require('./posts');

const server = new http.createServer((req, res) => {
  res.statusCode = 200;
  switch (req.method) {
    case 'POST':
      posts(req, res);
      break;
    case 'GET':
      res.setHeader('Content-Type', 'text/plain');
      res.end("It's alive , my server it's alive!!");
      break;
    default:
      break;
  }
});
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
