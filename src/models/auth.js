import db from '../data/db';

const insert = userData => db('users')
  .insert(userData)
  .returning('*');

const getByUsername = username => db('users').where({ username }).first();

export { insert, getByUsername };
