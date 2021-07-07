const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const CLIENT_PORT = 3000;
const SERVER_PORT = 3001;

const root_cwd = {
  cwd: path.resolve(__dirname, './'),
};
const server_cwd = {
  cwd: path.resolve(__dirname, './server'),
};
const client_cwd = {
  cwd: path.resolve(__dirname, './client'),
};

(function () {
  shell.exec('npm install', server_cwd);
  shell.exec('npm install', client_cwd);

  shell.exec('touch .env', server_cwd);
  shell.exec('touch .env.development', client_cwd);
  shell.exec('touch .env.production', client_cwd);

  {
    const envText = `PORT=${SERVER_PORT}`;
    fs.writeFileSync('./server/.env', envText, 'utf8');
  }
  {
    const envText = `REACT_APP_API_HOST=http://localhost:${SERVER_PORT}`;
    fs.writeFileSync('./client/.env.development', envText, 'utf8');
  }
  {
    const envText = `REACT_APP_API_HOST=http://localhost:${CLIENT_PORT}`;
    fs.writeFileSync('./client/.env.production', envText, 'utf8');
  }
  {
    const proxy_server = fs.readFileSync('./proxy-server.js', 'utf8');
    const updated_proxy_server = proxy_server.replace('http://localhost:3001', `http://localhost:${SERVER_PORT}`);
    fs.writeFileSync('./proxy-server.js', updated_proxy_server, 'utf8');
  }
  {
    const app = fs.readFileSync('./server/app.js', 'utf8');
    const updated_app = app.replace('http://localhost:3000', `http://localhost:${CLIENT_PORT}`);
    fs.writeFileSync('./server/app.js', updated_app, 'utf8');
  }

  shell.exec('npm run dev', root_cwd);
})();
