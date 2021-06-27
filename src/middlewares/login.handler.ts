import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { ErrorHandler } from './error.handler';

export const userLogin = async (req:Request, res:Response, next: NextFunction):Promise<void> => {
  const user = await getRepository(User).findOne({ login: req.body.login });
  if (user) {
    await bcrypt.compare(req.body.password, user.password, (_err, matches) => {
      if (matches) {
        const token = jwt.sign({ id: user.id }, process.env['JWT_SECRET_KEY'] as string, { expiresIn: 60 * 60 * 24 });
        const auth = {
          ...User.toResponse(user),
          token,
          message: 'Successfully authenticated.'
        };
        console.log(auth);
        res.status(201).json(auth);
      } else next(new ErrorHandler(401, 'Unauthorized'));
    });
  } else next(new ErrorHandler(401, 'Unauthorized'));
};
