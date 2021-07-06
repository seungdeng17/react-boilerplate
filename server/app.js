const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', require('./routes'));

const port = 3001;

app.listen(port, function () {
  console.log('Express server has started on port ' + port);
});
