import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { HttpStatus } from '../enums/http-status.js';
import UsersService from '../services/users.service.js';
import AuthService from '../services/auth.service.js';

export default class AuthController {
  private usersService: UsersService;
  private authService: AuthService;
  constructor() {
    this.usersService = new UsersService();
    this.authService = new AuthService();
  }

  async registerUser(req: Request, res: Response) {
    try {
      const userWithEmail = await this.usersService.find({
        email: req.body.email,
      });
      if (userWithEmail) {
        return res.status(HttpStatus.Conflict).json({
          success: true,
          message: 'User Already Exists With Provided Email',
          data: {},
        });
      }
      const userWithPhone = await this.usersService.find({
        phone: req.body.phone,
      });
      if (userWithPhone) {
        return res.status(HttpStatus.Conflict).json({
          success: true,
          message: 'User Already Exists With Provided Phone ',
          data: {},
        });
      }
      const newUser = await this.usersService.create(req.body);
      return res.status(HttpStatus.Created).json({
        success: true,
        message: 'User Created Successfully',
        data: newUser,
      });
    } catch (error: any) {
      console.error('controller:auth:registerUser:catch', {
        stack: error.stack,
        error: error.message,
      });
      return res
        .status(HttpStatus.InternalServerError)
        .json({ success: false, error: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const user = await this.usersService.find({
        email: req.body.email,
      });

      if (!user) {
        return res.status(HttpStatus.OK).json({
          success: false,
          message: 'User Does Not Exist With Provided Email',
          data: {},
        });
      }
      const isValidPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res
          .status(HttpStatus.Unauthorized)
          .json({ success: false, message: 'Invalid Password', data: {} });
      }
      const tokenPayload = {
        id: user.id,
        email: user.email,
        phone: user.phone,
      };
      const token = this.authService.generateToken(tokenPayload);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'User Logged In SuccessFully',
        token,
      });
    } catch (error: any) {
      console.error('controller:auth:loginUser:catch', {
        stack: error.stack,
        error: error.message,
      });
      return res
        .status(HttpStatus.InternalServerError)
        .json({ success: false, error: error.message });
    }
  }
}
