import knex from 'knex';
import dotenv from 'dotenv';

import knexfile from '../knexfile';

dotenv.config();

const configOptions = knexfile[process.env.NODE_ENV];

export default knex(configOptions);
