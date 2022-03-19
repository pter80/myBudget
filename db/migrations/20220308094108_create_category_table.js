exports.up = function(knex) {
  return knex.schema
    .createTable('category', function (table) {
      table.increments();
      table.string('lib');
      table.integer('category_id');
    })
    ;
    
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('category');
};