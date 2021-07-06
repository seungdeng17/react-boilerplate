const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

app.use(express.static('public'));
app.use('/favicon.png', express.static(__dirname + '/public/build/favicon.png'));
app.use('/static', express.static(__dirname + '/public/build/static'));
app.get('/*', (_, res) => {
  res.status(200).sendFile(__dirname + '/public/build/index.html');
});

app.listen(3000);
