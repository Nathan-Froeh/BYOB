const environment = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();
const data = require('./data');
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(`App running on port ${app.get('port')}.`)
})

// look up CTE or common table expresion
// no nesting 
// cant be reused and are slow

app.get('/', (request, response) => {
  database('type').select()
    .then((types) => {
      response.status(200).json(types)
    })
    .catch(error => {
      response.status(500).json({error})
    })
});

// localhost3000/:id
// id will be type id
// get all pokemon by type
app.get('/api/v1/:poketype', (request, response) => {
  const { poketype } = request.params;

  database('type').select('id').where({name: poketype})
  .then((id) => id[0].id)
  .then((id) => (
    database('pokemon').select().where({type_id: id})
  ))
  .then((pokemon) => response.status(200).json(pokemon))
  .catch(error => {
    response.status(500).json({error})
  })
})


// localhost3000/:id?strongest
// get strongest pokemon by type
app.get('/api/v1/:poketype/strongest', (request, response) => {
  const { poketype } = request.params;

  database('type').select('id').where({name: poketype})
  .then((id) => id[0].id)
  .then((id) => (
    database('pokemon').select().where({type_id: id})
  ))
  .then(pokemon => (
   pokemon.sort((a, b) => b.attack - a.attack)[0]
  ))
  .then((pokemon) => response.status(200).json(pokemon))
  .catch(error => {
    response.status(500).json({error})
  })
})

// localhost3000/:id?weakest 
// will return weakest pokemon for specified type
app.get('/api/v1/:poketype/weakest', (request, response) => {
  const { poketype } = request.params;

  database('type').select('id').where({name: poketype})
  .then((id) => id[0].id)
  .then((id) => (
    database('pokemon').select().where({type_id: id})
  ))
  .then(pokemon => (
    pokemon.sort((a, b) => a.attack - b.attack)[0]
  ))
  .then((pokemon) => response.status(200).json(pokemon))
  .catch(error => {
    response.status(500).json({error})
  })
})

// localhost/advantage/:id
// get all pokemon that are weak against specified type
app.get('/api/v1/advantage/:poketype', (request, response) => {
  const { poketype } = request.params;

  database('type').select('good_against').where({name: poketype})
  .then((id) => (
    database('type').select().where({name: id[0].good_against})
  ))
  .then((res) => (
    database('pokemon').select().where({type_id: res[0].id})
  ))
  .then((id) => {
    response.status(200).json(id)
  })
  .catch(error => {
    response.status(500).json({error})
  })
})

// localhost/advantage/:id/strongest
// get strongest pokemon that is weak against specified type
app.get('/api/v1/advantage/:poketype/strongest', (request, response) => {
  const { poketype } = request.params;

  database('type').select('good_against').where({name: poketype})
  .then((id) => (
    database('type').select().where({name: id[0].good_against})
  ))
  .then((res) => (
    database('pokemon').select().where({type_id: res[0].id})
  ))
  .then(pokemon => {
    const strongest = pokemon.sort((a, b) => b.attack - a.attack)[0]
    response.status(200).json(strongest)
  })
  .catch(error => {
    response.status(500).json({error})
  })
})

// localhost/advantage/:id/weakest
// get weakest pokemon that is weak against specified type
app.get('/api/v1/advantage/:poketype/weakest', (request, response) => {
  const { poketype } = request.params;

  database('type').select('good_against').where({name: poketype})
  .then((id) => (
    database('type').select().where({name: id[0].good_against})
  ))
  .then((res) => (
    database('pokemon').select().where({type_id: res[0].id})
  ))
  .then(pokemon => {
    const strongest = pokemon.sort((a, b) => a.attack - b.attack)[0]
    response.status(200).json(strongest)
  })
  .catch(error => {
    response.status(500).json({error})
  })
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