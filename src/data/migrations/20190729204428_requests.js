exports.up = knex => knex.schema.createTable('requests', (tbl) => {
  tbl.increments();
  tbl.text('name', 128).notNullable();
  tbl.text('food_type', 128).notNullable();
  tbl.text('pickup_date', 128).notNullable();
  tbl.text('pickup_time', 128).notNullable();
  tbl.text('comment', 128);
  tbl.text('instruction', 128);
  tbl.integer('status').defaultsTo(0);
  tbl.integer('volunteer_user_id');
  tbl
    .integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
});

exports.down = knex => knex.schema.dropTableIfExists('requests');
