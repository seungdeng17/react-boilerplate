const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const port = 3000;

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

app.use(express.static('public'));
app.use('/favicon.ico', express.static(__dirname + '/dist/favicon.ico'));
app.use('/static', express.static(__dirname + '/dist/static'));
app.get('/*', (_, res) => {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function () {
  console.log('\x1b[36m%s\x1b[0m', `Proxy server has started on port ${port} -> http://localhost:${port}`);
});
