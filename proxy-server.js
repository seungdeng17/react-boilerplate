const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

app.use(express.static('public'));
app.use('/favicon.ico', express.static(__dirname + '/dist/favicon.ico'));
app.use('/static', express.static(__dirname + '/dist/static'));
app.get('/*', (_, res) => {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.listen(3000);
