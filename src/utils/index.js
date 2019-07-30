import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const hashPassword = password => bcrypt.hashSync(password, 12);

const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

const generateToken = payload => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

const getStatus = (status) => {
  if (status === 0) {
    return 'Pending';
  }

  if (status === 1) {
    return 'Completed';
  }

  if (status === 2) {
    return 'Declined';
  }
};

const convertStatus = (data) => {
  if (data.length === undefined) {
    data.status = getStatus(data.status);
    return data;
  }

  if (data.length > 0) {
    const newData = data.map((singleData) => {
      singleData.status = getStatus(singleData.status);
      return singleData;
    });
    return newData;
  }
};

export {
  hashPassword,
  verifyPassword,
  generateToken,
  getStatus,
  convertStatus,
};
