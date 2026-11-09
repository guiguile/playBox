

// create a server by using Express

const express = require("express");
const morgan = require("morgan") //logger

const app = express();
const PORT=3000;

// Let's create a logger middleware
function requestLogger(req, res, next) {
    const start = Date.now();
 
    res.on("finish", () => {
        const duration = Date.now() - start;
 
        console.log(
            `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );
    });
    // Proceed on to the next middleware or if no more middleware exist, proceed to request handler method
    next();
}

// Set the middlewares here in order
// Use json parsing middleware
app.use(express.json());
// Set the next middleware function, which is logger. Now every request goes through logger function before handling the request
app.use(morgan('dev'));
 
// Local in-memory data in our backend (does not persist)
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
  },
  {
        id: 4,
        title: "Some new movie",
        director: "Another director",
        year: 2026
  },
];

// This works in all POST, PUT and PATCH scenarios (the object might be partial)
// validation function
function validateMovie(body, partial = false) {
  const errors = [];
  const maximumYear = new Date().getFullYear() + 5;

  if (!partial && body.title === undefined) {
    errors.push("title is required");
  }

  if (
    body.title !== undefined &&
    (typeof body.title !== "string" || body.title.trim().length === 0)
  ) {
    errors.push("title must be a non-empty string");
  }

  if (!partial && body.year === undefined) {
    errors.push("year is required");
  }

  if (
    body.year !== undefined &&
    (
      !Number.isInteger(body.year) ||
      body.year < 1888 ||
      body.year > maximumYear
    )
  ) {
    errors.push("year must be a valid integer");
  }

  if (!partial && body.genre === undefined) {
    errors.push("genre is required");
  }

  if (
    body.genre !== undefined &&
    (typeof body.genre !== "string" || body.genre.trim().length === 0)
  ) {
    errors.push("genre must be a non-empty string");
  }

  return errors;
}

// The first rest endpoint just sending a message back to the client
app.get("/", (req, res) => {
  res.send("Hello from my new Express server! It is using Nodemon");
});

// get all movies endpoints. Add support for query parameters and filtering
app.get("/movies", (req, res) => {
  let result = [...movies] // result is now all movies
 
    // Let's check if we have some query parameters in the request and
    // Filter the movies based of them (by year or director)
  const { year, director, sortBy } = req.query // let's check if there is year or director in query parameters
  if( director !== undefined ){
      // director is there so let's filter all movies for that director
      if( typeof director !== "string" || director.trim() === ""){
          return res.status(400).json({
              error: {
                  code: "INVALID_DIRECTOR",
                  message: "director must not be empty"
              }
          });
      }
      // Let's find all movies with that director
      const wantedDirector = director.trim().toLowerCase();
      result = result.filter(
          movie => movie.director.toLowerCase() === wantedDirector
      );
  }
  if( sortBy !== undefined ){
      if(sortBy === "year"){
          result.sort((a, b) => a.year - b.year)
      }
      // Todo: return 400 if there is some other / unsupported sort parameter
  }

  res.json(result); // return the possibly filtered results
});

// get movie by ID
app.get("/movies/:id", (req, res) => {
  const id=Number(req.params.id);
  const movie=movies.find((movie)=>movie.id===id);

  if(!movie){
    return res.status(404).json({erro: "Movie not found"});
  }
  res.status(200).json(movie); // status code by default, can be emitted here
});

// create one
app.post("/movies", (req, res) => {
  const {title, director, year}=req.body;

  errors = validateMovie( req.body, false );
    if( errors.length > 0 ){
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                message: "Movie data is invalid",
                details: errors
            }
        })
    }

  const newMovie={
    id: movies.length +1,
    title,
    director,
    year,
  };
  movies.push(newMovie);
  res.status(201).json(movie);
});

// put to full replacement of a movie
app.put('/movies/:id',(req,res) =>{
  const id = Number(req.params.id);
  const index = movies.findIndex( m=> m.id === id);
    if(index === -1) {
      return res.status(404).json({
        code: 'Movie_Not_Found', message: 'movie not found'
      })
    }
    // movie was found so let's update it with modern JS

    // step1: validate the new data (that's our next step which will be done by libraries like JOI in the end)
    errors = validateMovie( req.body, false );
    if( errors.length > 0 ){
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                message: "Movie data is invalid",
                details: errors
            }
        })
    }

    // if no errors, let's put the new movie data
    movies[index] = {id, ...req.body}; // let's replace all data but id
    res.json(movies[index]); // the default status code ok =200

});

// common patch here (patching is partial update, update only some existing fields)
app.patch('/movies/:id', (req,res)=>{
  const id = Number(req.params.id);
  const movie = movies.find( m=> m.id === id);

    if(!movie) {
      return res.status(404).json({error: 'Movie not found'});
    }

    // Patch might have a partial object body so let's use true here
    errors = validateMovie( req.body, true );
    if( errors.length > 0 ){
        return res.status(400).json({
            error: {
                code: "VALIDATION_ERROR",
                message: "Movie data is invalid",
                details: errors
            }
        })
    }

    const {title, director, year} = req.body; // try to read the fields from the body
    // field, which is not there, will be undifined, we update all fields that exitst (not undefined)
    if(title !== undefined) movie.title =title;
    if(director !== undefined) movie.director = director;
    if(year !== undefined) movie.year = year;

    res.json(movie); // return the movie and OK
})

// delete here
app.delete('/movies/:id',(req,res) =>{
  const id = Number(req.params.id);
  const index = movies.findIndex( m => m.id === id);

  if(index === -1) {
    return res.status(404).json({
      error: {code: 'Movie_Not_Found', message: 'movie not found'}});
  };

  movies.splice(index, 1);
  res.status(204).send(); // after deletion, return success code 204(means no content, and this must not contain a JSON response body)
});

// add unknown route middleware
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: "The requested route does not exist"
    }
  });
});

// add error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected server error occurred"
    }
  });
});

// Now, how to test? Either WebClient (add test case to requests.http or use postman (homework to install and try this))
  


app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT}`);
});