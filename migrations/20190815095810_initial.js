
exports.up = function(knex) {
  
  return Promise.all([
    knex.schema.createTable('Type', (table) => {
      table.increments('id').primary()
      table.string('id')
      table.string('name')
      table.string('good against')
      
      table.timestamps(true, true)
    })
  ])

};

exports.down = function(knex) {
  
};
