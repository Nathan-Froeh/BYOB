const environment = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.static('public'));

app.listen(app.get('port'), () => { // listening for current port being ran on
  console.log(`App running on port ${app.get('port')}.`)
})

app.get('/api/v1/type_list', (request, response) => {//run if extension is /api/v1/type_list
  database('type').select()// return pormise of all rows in the type table
    .then((types) => {
      response.status(200).json(types) // respond to GET with code 200 and array of type objects
    })
    .catch(error => {
      response.status(500).json({error}) // else respond to GET with 500 error
    })
});

app.get('/api/v1/:poketype', (request, response) => {
  const { poketype } = request.params;// get text in place of :poketype in url
  if(poketype) {
    database('type').select('id').where({name: poketype})//return promise of only the id if the name matches the poketype in the type table in an aray of objects
    .then((id) => id[0].id)
    .then((id) => (
      database('pokemon').select().where({type_id: id})//return promise of all pokemon in array of objects with a matching type_id
    ))
    .then((pokemon) => response.status(200).json(pokemon))// respond to GET with the array of objects
    .catch(error => {
      response.status(500).json({error})// else respond to GET with 500 error
    })
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')// if poketype is not supplied respond with error message
  }
})

app.get('/api/v1/:poketype/strongest', (request, response) => {
  const { poketype } = request.params;// get text in place of :poketype in url
  if(poketype) {
    database('type').select('id').where({name: poketype})//return promise of only the id if the name matches the poketype in the type table in an aray of objects
      .then((id) => id[0].id)
      .then((id) => (
        database('pokemon').select().where({type_id: id})//return promise of all pokemon in array of objects with a matching type_id
      ))
      .then(pokemon => (
        pokemon.sort((a, b) => b.attack - a.attack)[0]// sort pokemon by their attack from high to low and return the highest
      ))
      .then((pokemon) => response.status(200).json(pokemon))
      .catch(error => {
        response.status(500).json({error})// else respond to GET with 500 error
      })
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')// if poketype is not supplied respond with error message
  }
})

app.get('/api/v1/:poketype/weakest', (request, response) => {
  const { poketype } = request.params;// get text in place of :poketype in url
  if(poketype) {
    database('type').select('id').where({name: poketype})//return promise of only the id if the name matches the poketype in the type table in an aray of objects
      .then((id) => id[0].id)
      .then((id) => (
        database('pokemon').select().where({type_id: id})//return promise of all pokemon in array of objects with a matching type_id
      ))
      .then(pokemon => (
        pokemon.sort((a, b) => a.attack - b.attack)[0]// sort pokemon by their attack from low to high and return the lowest
      ))
      .then((pokemon) => response.status(200).json(pokemon))
      .catch(error => {
        response.status(500).json({error})// else respond to GET with 500 error
      })
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')// if poketype is not supplied respond with error message
  }
})

app.get('/api/v1/advantage/:poketype', (request, response) => {
  const { poketype } = request.params;// get text in place of :poketype in url
  if(poketype) {
    database('type').select('good_against').where({name: poketype})//return promise of only the good_against string if the name matches the poketype in the type table in an aray of objects
      .then((id) => (
        database('type').select().where({name: id[0].good_against})//return promise of a string of the type that the selected poketype is good against
      ))
      .then((res) => (
        database('pokemon').select().where({type_id: res[0].id})//return promise of all pokemon in array of objects with a matching type_id
      ))
      .then((id) => {
        response.status(200).json(id)
      })
      .catch(error => {
        response.status(500).json({error})// else respond to GET with 500 error
      })
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')// if poketype is not supplied respond with error message
  }
})

app.get('/api/v1/advantage/:poketype/strongest', (request, response) => {
  const { poketype } = request.params;// get text in place of :poketype in url
  if(poketype) {
    database('type').select('good_against').where({name: poketype})//return promise of only the good_against string if the name matches the poketype in the type table in an aray of objects
      .then((id) => (
        database('type').select().where({name: id[0].good_against})//return promise of a string of the type that the selected poketype is good against
      ))
      .then((res) => (
        database('pokemon').select().where({type_id: res[0].id})//return promise of all pokemon in array of 1 object with a matching type_id
      ))
      .then(pokemon => {
        const strongest = pokemon.sort((a, b) => b.attack - a.attack)[0]
        response.status(200).json(strongest)// sort pokemon by their attack from high to low and return the highest
      })
      .catch(error => {
        response.status(500).json({error})// else respond to GET with 500 error
      })
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')// if poketype is not supplied respond with error message
  }
})

app.get('/api/v1/advantage/:poketype/weakest', (request, response) => {
  const { poketype } = request.params;// get text in place of :poketype in url
  if(poketype) {
    database('type').select('good_against').where({name: poketype})//return promise of only the good_against string if the name matches the poketype in the type table in an aray of objects
      .then((id) => (
        database('type').select().where({name: id[0].good_against})//return promise of a string of the type that the selected poketype is good against
      ))
      .then((res) => (
        database('pokemon').select().where({type_id: res[0].id})//return promise of all pokemon in array of 1 object with a matching type_id
      ))
      .then(pokemon => {
        const strongest = pokemon.sort((a, b) => a.attack - b.attack)[0]// sort pokemon by their attack from low to high and return the lowest
        response.status(200).json(strongest)
      })
      .catch(error => {
        response.status(500).json({error})// else respond to GET with 500 error
      })
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')// if poketype is not supplied respond with error message
  }
})

app.post('/api/v1/newtype', (request, response) => {
  const { name, good_against } = request.body;// destructure from body
  const newType = {name: name, good_against: good_against};

  if(typeof name !== 'string' || name.length === 0) {// if name is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <name> should be a string greater than 0')
  } else if (typeof good_against !== 'string' || good_against.length === 0) {// if good_against is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <good_against> should be a string greater than 0')
  } else {
    database('type').select().where({name: name})// return promise from type table of matching name
      .then((res) => {
        if(res.length === 0) {// run if array is empty
          database('type').insert(newType)//add row to type table
            .then(() => database('type').select().where({name: name}))//return promise of newly added row
            .then(res => response.status(201).json(res))//respond with newly added row
            .catch(error => response.status(500).json(error))//respond with error
        } else {// run if array in not empty
          response.status(409).json('type already exists')//error because type already exsists
        }
      })
  }
})

app.post('/api/v1/newpokemon', (request, response) => {
  const {type, name, hp, attack, defense, speed} = request.body;// destructure from body
  const newPokemon = {
    name: name,
    hp: hp,
    attack: attack,
    defense: defense,
    speed: speed
  };

  if(typeof name !== 'string' || name.length === 0) {// if name is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <name> should be a string greater than 0')
  } else if (typeof type !== 'string' || type.length === 0) {// if type is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <type> should be a string greater than 0')
  } else if (typeof hp !== 'string' || hp.length === 0) {// if hp is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <hp> should be a string greater than 0')
  } else if (typeof attack !== 'string' || attack.length === 0) {// if attack is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <attack> should be a string greater than 0')
  } else if (typeof defense !== 'string' || defense.length === 0) {// if defense is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <defense> should be a string greater than 0')
  } else if (typeof speed !== 'string' || speed.length === 0) {// if speed is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <speed> should be a string greater than 0')
  } else {
    database('pokemon').select().where({name: name})//return promise of pokemon with matching name
      .then(currentPokemon => {
        if(currentPokemon.length === 0) {//continue if no matchin named pokemon
          database('type').select().where({name: type})//return promise of pokemon with matching type
            .then((res) => {
              if(res.length) {//continue if there is a matching type
                database('type').select('id').where({name: type})
                  .then(typeId => {
                    const Pokemon = {...newPokemon, type_id: typeId[0].id}//make pokemon object
                    database('pokemon').insert(Pokemon)//add pokemon row to pokemon table
                      .then(() => database('pokemon').select().where({name: name}))//return new pokemon from pokemon table
                      .then(res => response.status(201).json(res))//if pokemon is returned, ok
                      .catch(error => response.status(500).json(error))//error if no pokemon
                  })
              } else {//respond with error if no matching type
                response.status(404).json('type does not exist')
              }
          })
        } else {//if matching named pokemon respond with error already exists
          response.status(409).json(`Pokemon ${name} already exists`)
        }
      })
  }
})

app.delete('/api/v1', (request, response) => {
  const {name, type} = request.body;// destructure from body
  if(typeof name !== 'string' || name.length === 0) {// if name is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <name> should be a string greater than 0')
  } else if (typeof type !== 'string' || type.length === 0) {// if type is not a string and less than 1 character respond with error
    response.status(400)
      .json('Body value of <type> should be a string greater than 0')
  } else {
    database(type).select().where({name: name})//return promise with matching name from selected table
      .then(res => {
        if(res.length > 0) {//continue if the row of that table exists
          database(type).where({name: name}).del()//remove selected row from table
            .then((res) => response.status(202).json(res))//respond with number of removed rows
            .then(error => response.status(500).json(error))//else respond with error 
        } else {//respond with error if not row 
          response.status(410).json(`${type} with name ${name} does not exist`)
        }
      })
  }
})
