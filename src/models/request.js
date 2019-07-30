import db from '../data/db';

const insert = request => db('requests')
  .insert(request)
  .returning('*');

const getByUserId = (user_id, id = '') => {
  const condition = { user_id };
  if (id) {
    condition.id = id;
    return db('requests')
      .where(condition)
      .first();
  }
  return db('requests').where(condition);
};

export { insert, getByUserId };
