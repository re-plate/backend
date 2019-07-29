exports.up = knex => knex.schema.createTable('users', (tbl) => {
  tbl.increments();
  tbl
    .text('username', 128)
    .unique()
    .notNullable();
  tbl.text('password', 128).notNullable();
  tbl
    .integer('type')
    .notNullable()
    .unsigned()
    .defaultTo(2);
  tbl.text('email', 128).notNullable();
  tbl.integer('phone').unsigned();
  tbl.text('name', 128).notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists('users');
