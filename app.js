require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');

const movieList = require("./movieList");

const app = express();
app.use(morgan('dev'));
app.use(helmet())
app.use(cors());

app.get('/movie', (req, res) => {
    const movies = [...movieList]
    let { genre } = req.query

    res.send('Yay I work')

})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });