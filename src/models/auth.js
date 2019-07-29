import db from '../data/db';

const insert = userData => db('users')
  .insert(userData)
  .returning('*');

export { insert };
