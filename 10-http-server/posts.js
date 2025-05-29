const http = require('http');

const post = (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const data = JSON.parse(body);
    res.writeHeader(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify({ body: { message: 'This was a post' } }));
  });
};
module.exports = post;
