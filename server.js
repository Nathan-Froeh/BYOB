const express = require('express');
const app = express();
const data = require('./data')

// localhost3000/:id
// id will be type id
// get all pokemon by type
app.get('/api/v1/:id', (request, response) => {
  
})


// localhost3000/:id?strongest
// get strongest pokemon by type


// localhost3000/:id?weakest 
// will return weakest pokemon for specified type


// localhost/advantage/:id
// get all pokemon that are weak against specified type


// localhost/advantage/:id?strongest
// get strongest pokemon that is weak against specified type

// localhost/advantage/:id?weakest
// get weakest pokemon that is weak against specified type


// localhost3000/newtype
// add a new type of pokemon


// localhost3000/:id/newpokemon
// add new pokemon to specified type

// localhost3000/remove
// removes a pokemon or a type