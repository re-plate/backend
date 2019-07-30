import db from '../data/db';

const insert = request => db('requests')
  .insert(request)
  .returning('*');

const getByUserId = user_id => db('requests').where({ user_id });

export { insert, getByUserId };
