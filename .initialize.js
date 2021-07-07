const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const CLIENT_PORT = 3000;
const SERVER_PORT = 3001;

const ROOT_CWD = {
  cwd: path.resolve(__dirname, './'),
};
const SERVER_CWD = {
  cwd: path.resolve(__dirname, './server'),
};
const CLIENT_CWD = {
  cwd: path.resolve(__dirname, './client'),
};

(function () {
  const { stdout } = shell.exec('yarn -v', ROOT_CWD);
  if (stdout.length > 20) return console.log('❌ yarn: command not found');
  if (CLIENT_PORT === SERVER_PORT) return console.log('❌ Check the port number.');

  shell.exec('yarn', SERVER_CWD);
  shell.exec('yarn', CLIENT_CWD);

  shell.exec('touch .env', SERVER_CWD);
  shell.exec('touch .env.development', CLIENT_CWD);
  shell.exec('touch .env.production', CLIENT_CWD);

  {
    const env = `PORT=${SERVER_PORT}`;
    fs.writeFileSync('./server/.env', env, 'utf8');
  }
  {
    const env = `REACT_APP_API_HOST=http://localhost:${SERVER_PORT}`;
    fs.writeFileSync('./client/.env.development', env, 'utf8');
  }
  {
    const env = `REACT_APP_API_HOST=http://localhost:${CLIENT_PORT}`;
    fs.writeFileSync('./client/.env.production', env, 'utf8');
  }
  {
    const proxyServer = fs.readFileSync('./proxy-server.js', 'utf8');
    const updatedProxyServer = proxyServer
      .replace('http://localhost:3001', `http://localhost:${SERVER_PORT}`)
      .replace('port = 3000', `port = ${CLIENT_PORT}`);
    fs.writeFileSync('./proxy-server.js', updatedProxyServer, 'utf8');
  }
  {
    const webpackDev = fs.readFileSync('./client/webpack/dev.js', 'utf8');
    const updatedWebpackDev = webpackDev.replace('port: 3000', `port: ${CLIENT_PORT}`);
    fs.writeFileSync('./client/webpack/dev.js', updatedWebpackDev, 'utf8');
  }
  {
    const app = fs.readFileSync('./server/app.js', 'utf8');
    const updatedApp = app.replace('http://localhost:3000', `http://localhost:${CLIENT_PORT}`);
    fs.writeFileSync('./server/app.js', updatedApp, 'utf8');
  }

  shell.exec('yarn dev', ROOT_CWD);
})();
