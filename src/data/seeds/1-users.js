import { hashPassword } from '../../utils';

exports.seed = knex => knex('users')
  .del()
  .then(() => knex('users').insert([
    {
      id: 1,
      username: 'easybuoy',
      password: hashPassword('ekunola'),
      email: 'example@gmail.com',
      name: 'Ezekiel Ekunola',
      type: 1,
    },
    {
      id: 2,
      username: 'ezekiel',
      password: hashPassword('ekunola'),
      email: 'example2@gmail.com',
      name: 'Ezekiel Ekunola',
      type: 1,
    },
  ]));
