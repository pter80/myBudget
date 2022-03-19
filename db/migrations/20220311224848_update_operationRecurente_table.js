/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .table('operation_recurente', function (table) {
      table.integer('jour_echeance')
      
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .table('operation_recurente', function (table) {
      table.dropColumn('jour_echeance');
    });
};
