
exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('type').del()
    .then(() => {
      // Inserts seed entries
      return knex('type').insert([
      
      ]);
    });
};
