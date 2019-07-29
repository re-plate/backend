import bcrypt from 'bcrypt';

const hashPassword = password => bcrypt.hashSync(password, 12);

const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

export { hashPassword, verifyPassword };
