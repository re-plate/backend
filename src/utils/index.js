import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashPassword = password => bcrypt.hashSync(password, 12);

const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

const generateToken = (payload) => {
    return jwt.sign(payload, )
}

export { hashPassword, verifyPassword };
