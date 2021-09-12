require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.db = db;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/api', require('./routes'));

app.listen(port, function () {
  console.log('Express server has started on port ' + port);
});
