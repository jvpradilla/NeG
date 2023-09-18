const http = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const hostname = 'localhost';
const port = 5002;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt')
};


app.prepare().then(() => {
  http.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log('> Ready on https://localhost:5002');
  });
});