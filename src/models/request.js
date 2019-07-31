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

const getById = id => db('requests')
  .where({ id })
  .first();

const get = () => db('requests');

const deleteRequest = id => db('requests')
  .where({ id })
  .delete();

const updateRequest = (id, changes) => db('requests')
  .where({ id })
  .update(changes);

const updateRequestStatus = (id, changes) => db('requests')
  .where({ id })
  .update(changes);

const findRequest = name => db('requests').where('name', 'like', `%${name}%`);
// .select('name', 'email', 'phone', 'username');


export {
  insert,
  getByUserId,
  get,
  getById,
  deleteRequest,
  updateRequest,
  updateRequestStatus,
  findRequest
};
