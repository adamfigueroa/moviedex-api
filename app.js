require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const movieList = require("./movieList");

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.get("/movie", (req, res) => {
  const movies = [...movieList];
  let { genre, country } = req.query;
  let genresFilter = [];
  let countryFilter = [];

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  if (genre) {
    genresFilter = movies.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  };

  if (genre === undefined) {
    genresFilter = movies
};

if (country) {
    countryFilter = movies.filter((movie) =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
    return res.json(countryFilter)
  };

  res.json(genresFilter);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
