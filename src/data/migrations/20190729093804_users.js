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
    .defaultTo(2);
});

exports.down = knex => knex.schema.dropTableIfExists('users');
