const environment = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(`App running on port ${app.get('port')}.`)
})

app.get('/api/v1/type_list', (request, response) => {
  database('type').select()
    .then((types) => {
      response.status(200).json(types)
    })
    .catch(error => {
      response.status(500).json({error})
    })
});

app.get('/api/v1/:poketype', (request, response) => {
  const { poketype } = request.params;
  if(poketype) {
    database('type').select('id').where({name: poketype})
    .then((id) => id[0].id)
    .then((id) => (
      database('pokemon').select().where({type_id: id})
    ))
    .then((pokemon) => response.status(200).json(pokemon))
    .catch(error => {
      response.status(500).json({error})
    })
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')
  }
})

app.get('/api/v1/:poketype/strongest', (request, response) => {
  const { poketype } = request.params;
  if(poketype) {
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
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')
  }
})

app.get('/api/v1/:poketype/weakest', (request, response) => {
  const { poketype } = request.params;
  if(poketype) {
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
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')
  }
})

app.get('/api/v1/advantage/:poketype', (request, response) => {
  const { poketype } = request.params;
  if(poketype) {
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
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')
  }
})

app.get('/api/v1/advantage/:poketype/strongest', (request, response) => {
  const { poketype } = request.params;
  if(poketype) {
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
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')
  }
})

app.get('/api/v1/advantage/:poketype/weakest', (request, response) => {
  const { poketype } = request.params;
  if(poketype) {
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
  } else {
    response.status(422).json('Invalid pokemon <type> paramiter')
  }
})

app.post('/api/v1/newtype', (request, response) => {
  const { name, good_against } = request.body;
  const newType = {name: name, good_against: good_against};

  if(typeof name !== 'string' || name.length === 0) {
    response.status(400)
      .json('Body value of <name> should be a string greater than 0')
  } else if (typeof good_against !== 'string' || good_against.length === 0) {
    response.status(400)
      .json('Body value of <good_against> should be a string greater than 0')
  } else {
    database('type').select().where({name: name})
      .then((res) => {
        if(res.length === 0) {
          database('type').insert(newType)
            .then(() => database('type').select().where({name: name}))
            .then(res => response.status(201).json(res))
            .catch(error => response.status(500).json(error))
        } else {
          response.status(409).json('type already exists')
        }
      })
  }
})

app.post('/api/v1/newpokemon', (request, response) => {
  const {type, name, hp, attack, defense, speed} = request.body;
  const newPokemon = {
    name: name,
    hp: hp,
    attack: attack,
    defense: defense,
    speed: speed
  };

  if(typeof name !== 'string' || name.length === 0) {
    response.status(400)
      .json('Body value of <name> should be a string greater than 0')
  } else if (typeof type !== 'string' || type.length === 0) {
    response.status(400)
      .json('Body value of <type> should be a string greater than 0')
  } else if (typeof hp !== 'string' || hp.length === 0) {
    response.status(400)
      .json('Body value of <hp> should be a string greater than 0')
  } else if (typeof attack !== 'string' || attack.length === 0) {
    response.status(400)
      .json('Body value of <attack> should be a string greater than 0')
  } else if (typeof defense !== 'string' || defense.length === 0) {
    response.status(400)
      .json('Body value of <defense> should be a string greater than 0')
  } else if (typeof speed !== 'string' || speed.length === 0) {
    response.status(400)
      .json('Body value of <speed> should be a string greater than 0')
  } else {
    database('pokemon').select().where({name: name})
      .then(currentPokemon => {
        if(currentPokemon.length === 0) {
          database('type').select().where({name: type})
            .then((res) => {
              if(res.length) {
                database('type').select('id').where({name: type})
                  .then(typeId => {
                    const Pokemon = {...newPokemon, type_id: typeId[0].id}
                    database('pokemon').insert(Pokemon)
                      .then(() => database('pokemon').select().where({name: name}))
                      .then(res => response.status(201).json(res))
                      .catch(error => response.status(500).json(error))
                  })
              } else {
                response.status(404).json('type does not exist')
              }
          })
        } else {
          response.status(409).json(`Pokemon ${name} already exists`)
        }
      })
  }
})

app.delete('/api/v1', (request, response) => {
  const {name, type} = request.body;
  if(typeof name !== 'string' || name.length === 0) {
    response.status(400)
      .json('Body value of <name> should be a string greater than 0')
  } else if (typeof type !== 'string' || type.length === 0) {
    response.status(400)
      .json('Body value of <type> should be a string greater than 0')
  } else {
    database(type).select().where({name: name})
      .then(res => {
        if(res.length > 0) {
          database(type).where({name: name}).del()
            .then((res) => response.status(202).json(res))
            .then(error => response.status(500).json(error))
        } else {
          response.status(410).json(`${type} with name ${name} does not exist`)
        }
      })
  }
})
