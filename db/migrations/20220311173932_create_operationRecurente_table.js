/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('operation_recurente', function (table) {
      table.increments('id').unsigned();
      table.date('date_fin').notNullable();
      table.string('lib', 255);
      table.decimal('montant',10,2);
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('id').inTable('category').onDelete("NO ACTION").onUpdate("NO ACTION");
    
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('operation_recurente');
  
};
