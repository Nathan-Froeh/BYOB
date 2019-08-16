const data = require('../../data');



exports.seed = knex => {

  const types = [
    {name: 'Normal', good_against: 'Ghost'},
    {name: 'Fighting', good_against: 'Normal'},
    {name: 'Poison', good_against: 'Fairy'},
    {name: 'Ground', good_against: 'Electric'},
    {name: 'Rock', good_against: 'Ice'},
    {name: 'Bug', good_against: 'Psychic'},
    {name: 'Ghost', good_against: 'Bug'},
    {name: 'Fire', good_against: 'Grass'},
    {name: 'Water', good_against: 'Fire'},
    {name: 'Grass', good_against: 'Rock'},
    {name: 'Electric', good_against: 'Water'},
    {name: 'Psychic', good_against: 'Poison'},
    {name: 'Ice', good_against: 'Ground'},
    {name: 'Dragon', good_against: 'Dragon'},
    {name: 'Fairy', good_against: 'Fighting'}
  ]

  const addType = (async pokeType => {
    await knex('type').insert({ name: pokeType.name, good_against: pokeType.good_against },'id')
  })

  return knex('pokemon').del()
    .then(() => knex('type').del())
    .then(() => {
          return knex('type').insert(types, 'id')
    })
            .then(() => {
              const typePromises = []
              // console.log(typeId)
              data.forEach(pokemon => {
                const type = pokemon.type
                typePromises.push(fillType(knex, pokemon, type))
              })
              return Promise.all(typePromises)
            })

            .then(() => console.log('Database was seeded!'))
            .catch(error => console.log(`Seed error ${error}`))
    .catch(error => console.log(`Error while seeding ${error}`))
};

const fillType = (knex, pokemon, type) => {
  return knex('type').where('name', type).first()
    .then(typeName => {
      console.log(typeName)
      return knex('pokemon').insert({
            type_id: typeName.id,
            name: pokemon.name,
            hp: pokemon.HP,
            attack: pokemon.Attack,
            defense: pokemon.Defense,
            speed: pokemon.Speed
      })
      })
}