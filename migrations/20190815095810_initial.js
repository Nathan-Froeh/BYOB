
exports.up = function(knex) {
  
  return Promise.all([
    knex.schema.createTable('type', table => {
      table.increments('id').primary()
      table.string('id')
      table.string('name')
      table.string('good against')

      table.timestamps(true, true)
    }),
    knex.schema.createTable('pokemon', table => {
      table.increments('id').primary()
      table.string('id')
      table.string('name')
      table.string('hp')
      table.string('attack')
      table.string('defense')
      table.string('speed')
      table.integer('type_id').unsigned()
      table.foreign('type_id')
        .references('type.id')
    })
  ])

};

exports.down = function(knex) {
  
};
