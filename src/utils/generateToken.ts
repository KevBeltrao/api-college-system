import jwt from 'jsonwebtoken';

export default (param: object) => jwt.sign(param, process.env.SECRET || '', {
  expiresIn: 30 * 24 * 60 * 60,
});
