import AuthController from '../controllers/auth.controller.js';
import { Request, Response, Router } from 'express';
import {
  userRegisterSchema,
  userLoginSchema,
} from '../middlewares/validators.js';
import { HttpStatus } from 'api/enums/http-status.js';
export default class AuthRouter {
  public router: Router;
  private authController: AuthController;
  constructor() {
    this.router = Router();
    this.initializedRoutes();

    this.authController = new AuthController();
  }
  private initializedRoutes() {
    this.router.post('/register-user', (req: Request, res: Response) => {
      userRegisterSchema
        .validateAsync(req.body)
        .then((validateBody) => {
          req.body = validateBody;
          return this.authController.registerUser(req, res);
        })
        .catch((error: Error) => {
          console.error('route:auth:register-user:catch', error);
          res.json({ success: false, error: error.message });
        });
    });

    this.router.post('/login-user', (req: Request, res: Response) => {
      userLoginSchema
        .validateAsync(req.body)
        .then((validateBody) => {
          req.body = validateBody;
          return this.authController.loginUser(req, res);
        })
        .catch((error: Error) => {
          console.error('route:auth:login-user:catch', error);
          res
            .status(HttpStatus.BadRequest)
            .json({ success: false, error: error.message, data: {} });
        });
    });
  }
}
