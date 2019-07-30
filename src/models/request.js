import db from '../data/db';

const insert = request => db('requests')
  .insert(request)
  .returning('*');


export { insert };
