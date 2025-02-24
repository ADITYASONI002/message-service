import { TokenPayload, User } from '../../api/interfaces/users.interface';
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

export default class AuthService {
  generateToken(payload: TokenPayload) {
    try {
      return jwt.sign(payload, config.jwtSecretKey, { expiresIn: '1d' });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
