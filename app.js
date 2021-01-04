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

app.use(
  (validateBearerToken = (req, res, next) => {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get("Authorization");
    if (!authToken || authToken.split(" ")[1] !== apiToken) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
  })
);

app.get("/movie", (req, res) => {
  let movies = [...movieList];
  let unfilteredGenreTypes = movies.map((movie) => {
    return movie.genre.toLowerCase();
  });
  let filteredGenreTypes = unfilteredGenreTypes.filter((c, index) => {
    return unfilteredGenreTypes.indexOf(c) === index;
  });
  console.log(filteredGenreTypes);

  let { genre, country, avg_vote } = req.query;

  if (genre && country) {
    let movieGenre = movies.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
    let movieCountry = movieGenre.filter((movie) =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
    if (movieCountry.length === 0) {
      return res.status(400).json({
        error: `Sorry, there are no matches for your chosen genre: ${genre} and country: ${country}`,
      });
    } else return res.json(movieCountry);
  }

  if (genre && !filteredGenreTypes.includes(genre.toLowerCase())) {
    return res.status(400).json({
      error: `Sorry, you need to choose one of the following genres: ${filteredGenreTypes}`,
    });
  }

  if (genre) {
    movies = movies.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
    return res.json(movies);
  }

  if (country) {
    movies = movies.filter((movie) =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
    return res.json(movies);
  }

  if (avg_vote) {
    movies = movies.filter(
      (movie) => Number(movie.avg_vote) >= Number(avg_vote)
    );
  }

  res.json(movies);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
