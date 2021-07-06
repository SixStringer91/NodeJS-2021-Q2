import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/error.handler';
import { userLoginController } from './login.controller';

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const login = await userLoginController({
    login: req.body.login,
    password: req.body.password
  });
  if (login) {
    res.status(201).json(login);
  }
  next(new ErrorHandler(401, 'Unauthorized'));
};
