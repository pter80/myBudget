/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {id: 1, lib: 'Assurances'},
    {id: 2, lib: 'Voiture'},
    {id: 3, lib: 'Bateau'}
  ]);
};
