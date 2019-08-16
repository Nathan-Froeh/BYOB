const express = require('express');
const app = express();
const data = require('./data');
const bodyParser = require('body-parser');
const port = 3001;

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