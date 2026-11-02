const express = require("express");

const app = express();
const PORT=3000;
app.use(express.json());

let movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010
  },
  {
    id: 2,
    title: "The Matrix",
    director: "The Wachowskis",
    year: 1999
  },
  {
    id: 3,
    title: "Parasite",
    director: "Bong Joon-ho",
    year: 2019
  }
];

app.get("/", (req, res) => {
  res.send("Hello from my new Express server! It is using Nodemon");
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:id", (req, res) => {
  const id=Number(req.params.id);
  const movie=movies.find((movie)=>movie.id===id);

  if(!movie){
    return res.status(404).json({erro: "Movie not found"});
  }
  res.status(200).json(movie);
});

app.post("/movies", (req, res) => {
  const {title, director, year}=req.body;

  if (!title || !director ||!year) {
    return res.status(400).json({
      error: "Title, director and year are required"
    });
  }

  const movie={
    id: movies.length +1,
    title,
    director,
    year,
  };
  movies.push(movie);
  res.status(201).json(movie);
});

app.listen(3000,()=>{
  console.log(`http://localhost:${PORT}`);
});