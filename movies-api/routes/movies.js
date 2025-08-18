const express = require("express");
const router = express.Router();

let movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "Interstellar", director: "Christopher Nolan", year: 2014 },
  { id: 3, title: "The Matrix", director: "Wachowskis", year: 1999 },
];

// GET all movies
router.get("/", (req, res) => {
  res.json(movies);
});

// GET movie by id
router.get("/:id", (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
});

// POST create new movie
router.post("/", (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) {
    return res.status(400).json({ error: "Title, director and year are required" });
  }

  const newMovie = {
    id: movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1,
    title,
    director,
    year: Number(year)
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// PUT update movie
router.put("/:id", (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: "Movie not found" });

  const { title, director, year } = req.body;
  if (!title || !director || !year) {
    return res.status(400).json({ error: "Title, director and year are required" });
  }

  movie.title = title;
  movie.director = director;
  movie.year = Number(year);

  res.json(movie);
});

// DELETE movie
router.delete("/:id", (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (movieIndex === -1) return res.status(404).json({ error: "Movie not found" });

  const deleted = movies.splice(movieIndex, 1);
  res.json({ message: "Movie deleted", movie: deleted[0] });
});

module.exports = router;
