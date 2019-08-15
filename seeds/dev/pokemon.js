const data = require('./data');


exports.seed = knex => {

  const types = [
    {name: 'normal', good_against: 'ghost'},
    {name: 'fighting', good_against: 'normal'},
    {name: 'ground', good_against: 'electric'},
    {name: 'rock', good_against: 'ice'},
    {name: 'bug', good_against: 'psychic'},
    {name: 'ghost', good_against: 'bug'},
    {name: 'fire', good_against: 'grass'},
    {name: 'water', good_against: 'fire'},
    {name: 'grass', good_against: 'rock'},
    {name: 'electric', good_against: 'water'},
    {name: 'psychic', good_against: 'poison'},
    {name: 'ice', good_against: 'ground'},
    {name: 'dragon', good_against: 'dragon'},
    {name: 'fairy', good_against: 'fighting'}
  ]

  return knex('pokemon').del()
    .then(() => knex('type').del())
    .then(() => {
      return Promise.all([
        types.forEach(type => {
          knex('type').insert({type},'id')
            .then(typeId => {
              return knex('pokemon').insert(() => {
                const creatures = data.filter(pokemon => {
                  if(pokemon.type === type) {
                    return pokemon
                  }
                })
                return creatures.map(pokemon => (
                  {
                    type_id: typeId,
                    name: pokemon.name,
                    hp: pokemon.HP,
                    attack: pokemon.Attack,
                    defense: pokemon.Defense,
                    speed: pokemon.Speed
                  }
                ))
              })
            })

        })
        .then(() => console.log('Database was seeded!'))
        .catch(error => console.log(`Seed error ${error}`))

      ])
    })
    .catch(error => console.log(`Error while seeding ${error}`))
};
