import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUser } from '../resources/users/user.service';

export const validateSession = (req:Request, res:Response, next:NextFunction):void => {
  if (req.method === 'OPTIONS') {
    next();
  } else {
    const header = <string> req.headers['x-access-token'] || req.headers.authorization;
    const sessionToken = header ? header.replace(/^Bearer\s+/, '') : '';
    if (!sessionToken) {
      res
        .status(401)
        .send({ auth: false, message: 'Unauthorized error' });
    } else {
      jwt.verify(sessionToken, process.env['JWT_SECRET_KEY'] as string, (_err, decoded) => {
        if (decoded) {
          getUser(decoded['id']).then(
            () => {
              next();
            },
            () => {
              res.status(401).send({ error: 'Unauthorized error' });
            }
          );
        } else {
          res.status(400).send({ error: 'not authorized' });
        }
      });
    }
  }
};
