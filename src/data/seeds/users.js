exports.seed = knex => knex('users')
  .del()
  .then(() => knex('users').insert([
    { id: 1, username: 'ezekiel', password: 'ekunola' },
    { id: 2, username: 'ezekiel1', password: 'ekunola' },
  ]));
