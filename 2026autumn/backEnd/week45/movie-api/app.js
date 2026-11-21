require("dotenv").config();

// create a server by using Express

const express = require("express");
const morgan = require("morgan") //logger
const pool = require("./db"); //dotenv must run before require("./db"). db.js creates Pool using process.env values.



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
/*let movies = [
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
]; */

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

// verify the connection before CRUD
async function startServer() {
  try {
    const result = await pool.query(
      "SELECT NOW() AS database_time"
    );
    
    console.log("Connected:", result.rows[0].database_time);
    
    app.listen(PORT, () => {
      console.log(`Server at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();

// Add a health endpoint
app.get("/health/database", async (req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT NOW() AS database_time"
        );

        res.json({
            status: "ok",
            databaseTime: result.rows[0].database_time
        });
    } catch (error) {
      next(error);
    }
});

// The first rest endpoint just sending a message back to the client
app.get("/", (req, res) => {
  res.send("Hello from my new Express server! It is using Nodemon");
});

// get all movies endpoints. Add support for query parameters and filtering
app.get("/movies", async (req, res, next) => {
  /*
  let result = [...movies] // result is now all movies
 
    // Let's check if we have some query parameters in the request and
    // Filter the movies based on them (by year or director)
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
  */

  // replace returning the local array with a SQL query:
  try {
    const result = await pool.query(
      "SELECT id, title, director, release_year AS year FROM movies ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// get movie by ID
app.get("/movies/:id", async (req, res, next) => {
  const id=Number(req.params.id);

  /*const movie=movies.find((movie)=>movie.id===id);

  if(!movie){
    return res.status(404).json({erro: "Movie not found"});
  }
  res.status(200).json(movie); // status code by default, can be emitted here */
  const result = await pool.query(
      "SELECT id, title, director, release_year AS year FROM movies WHERE id = $1", [id]);

  if (result.rows.length===0) {
    return res.status(404).json({
      error: {
        code: "MOVIE_NOT_FOUND", message: "Movie not found"}
    })
  }

  res.json(result.rows[0]);
});

// create one
app.post("/movies", async (req, res, next) => {
  const {title, director, year}=req.body;

  /*errors = validateMovie( req.body, false );
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
  res.status(201).json(movie);*/

  //the database generates the ID, the API returns the created row
  const result = await pool.query(
      "INSERT INTO movies (title, director, release_year) VALUES ($1, $2, $3) RETURNING id, title, director, release_year AS year", [
        title.trim(),
        director.trim(),
        year
      ]);

  res.status(201).json(result.rows[0]);
});

// put to full replacement of a movie
app.put('/movies/:id', async(req,res, next) =>{
  /*const id = Number(req.params.id);
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
    res.json(movies[index]); // the default status code ok =200*/

    // database PUT method
    try {
      const id = Number(req.params.id);
      const { title, director, year } = req.body;

      const result = await pool.query(
        `UPDATE movies
        SET title = $1,
            director = $2,
            release_year = $3
        WHERE id = $4
        RETURNING
          id,
          title,
          director,
          release_year AS year`,
        [title.trim(), director.trim(), year, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: {
            code: "MOVIE_NOT_FOUND",
            message: "Movie not found"
          }
        });
      }

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
});

// common patch here (patching is partial update, update only some existing fields)
app.patch('/movies/:id', async (req,res,next)=>{
  /*const id = Number(req.params.id);
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

    res.json(movie); // return the movie and OK */

    // database PATCH method needs controlled dynamic SQL

  try {
    const id = Number(req.params.id);
    const allowedFields = {
        title: "title",
        director: "director",
        year: "release_year"
      };

      const setClauses=[];
      const values = [];

      for (const [field,column] of Object.entries(allowedFields)) {
        if (req.body[field] !== undefined) {
          values.push(req.body[field]);
          setClauses.push(`${column} = $${values.length}`);
        }
      }

      // no fields supplied
      if (setClauses.length===0){
        return res.status(400).json({
          error:{
            code: "NO_FIELDS_TO_UPDATE",
            message: "Provide at least one field to update"
          }
        });
      }

      values.push(id);

      const query = `
        UPDATE movies
        SET ${setClauses.join(",")}
        WHERE id= $${values.length}
        RETURNING id, title, director, release_year AS year      
      `;

      const result = await pool.query(query, values);

      if (result.rows.length===0) {
        return res.status(404).json({
          error:{
            code: "MOVIE_NOT_FOUND",
            message: "Movie not found"
          }
        });
      }

      res.json(result.rows[0]);

    } catch (error) {
      next(error);
    }
})

// delete here
app.delete('/movies/:id', async (req,res,next) =>{
  const id = Number(req.params.id);
  /*const index = movies.findIndex( m => m.id === id);

  if(index === -1) {
    return res.status(404).json({
      error: {code: 'Movie_Not_Found', message: 'movie not found'}});
  };

  movies.splice(index, 1);
  res.status(204).send(); // after deletion, return success code 204(means no content, and this must not contain a JSON response body) */

  // with database method
  const result = await pool.query(`
    DELETE FROM movies WHERE id = $1 RETURNING id`, [id]
  );

  if (result.rows.length===0) return res.status(404).json({
    error: { code: "MOVIE_NOT_FOUND", message: "Movie not found"}
  });
  res.status(204).send();

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
  console.error("Unexpected error:", err);

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected server error occurred"
    }
  });
});

// Now, how to test? Either WebClient (add test case to requests.http or use postman (homework to install and try this))