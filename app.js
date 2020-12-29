require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(helmet())
app.use(cors());

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });