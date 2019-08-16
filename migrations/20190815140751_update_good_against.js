
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('type', table => {
      table.dropColumn('good against')
    }),
    knex.schema.table('type', table => {
      table.string('good_against')
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('type', table => {
      table.string('good against')
    }),
    knex.schema.table('type', table => {
      table.dropColumn('good_against')
    })
  ])
};
