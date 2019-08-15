const data = require('../../data');


exports.seed = knex => {

  const types = [
    {name: 'Normal', good_against: 'Ghost'},
    {name: 'Fighting', good_against: 'Normal'},
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

  return knex('pokemon').del()
    .then(() => knex('type').del())
    .then(() => {
      return Promise.all([
        types.forEach(pokeType => {
          console.log(pokeType)
          knex('type').insert({ name: pokeType.name, good_against: pokeType.good_against },'id')

            // .then(typeId => {
            //   // console.log(typeId)
            //   return knex('pokemon').insert(() => {
            //     const creatures = data.filter(pokemon => {
            //       // console.log(pokeType)
            //       if(pokemon.type === pokeType.name) {
            //         // console.log(pokeType, pokemon)
            //         return pokemon
            //       }
            //     })
            //     return creatures.map(pokemon => {
            //       return {
            //         type_id: typeId[0],
            //         name: pokemon.name,
            //         hp: pokemon.HP,
            //         attack: pokemon.Attack,
            //         defense: pokemon.Defense,
            //         speed: pokemon.Speed
            //       }
            //     })
            //   })
            // })

            .then(() => console.log('Database was seeded!'))
            .catch(error => console.log(`Seed error ${error}`))
        })

      ])
    })
    .catch(error => console.log(`Error while seeding ${error}`))
};
