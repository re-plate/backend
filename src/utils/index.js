import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const hashPassword = password => bcrypt.hashSync(password, 12);

const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

const generateToken = payload => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

const getStatus = status => {
    if (status === 0) {
        return 'Pending';
    }

    if (status === 1) {
        return 'Completed';
    }
}
export { hashPassword, verifyPassword, generateToken };
