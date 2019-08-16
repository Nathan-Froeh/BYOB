const environment = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();
const data = require('./data');
const bodyParser = require('body-parser');
const port = 3000;
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'nathan',
  host: 'localhost',
  database: 'pokemon',
  password: 'password',
  port: 5432,
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// SELECT * FROM pokemon WHERE type_id='1437';

app.get('/', (request, response) => {
  pool.query('SELECT * FROM type', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// localhost3000/:id
// id will be type id
// get all pokemon by type
app.get('/api/v1/:id', (request, response) => {

})


// localhost3000/:id?strongest
// get strongest pokemon by type
app.get('/api/v1/:id?strongest', (request, response) => {
  
})

// localhost3000/:id?weakest 
// will return weakest pokemon for specified type
app.get('/api/v1/:id?weakest', (request, response) => {
  
})

// localhost/advantage/:id
// get all pokemon that are weak against specified type
app.get('/api/v1/advantage/:id', (request, response) => {
  
})

// localhost/advantage/:id?strongest
// get strongest pokemon that is weak against specified type
app.get('/api/v1/advantage/:id?strongest', (request, response) => {
  
})

// localhost/advantage/:id?weakest
// get weakest pokemon that is weak against specified type
app.get('/api/v1/advantage/:id?weakest', (request, response) => {
  
})

// localhost3000/newtype
// add a new type of pokemon
app.post('/api/v1/newtype', (request, response) => {
  
})

// localhost3000/:id/newpokemon
// add new pokemon to specified type
app.post('/api/v1/newpokemon', (request, response) => {
  
})

// localhost3000/remove
// removes a pokemon or a type
app.delete('/api/v1', (request, response) => {
  
})