import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUser } from '../resources/users/user.service';

export const validateSession = (req:Request, res:Response, next:NextFunction) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    console.log(req.url);
    const header = <string> req.headers['x-access-token'] || req.headers.authorization;
    const sessionToken = header ? header.replace(/^Bearer\s+/, '') : '';
    if (!sessionToken) {
      res
        .status(401)
        .send({ auth: false, message: 'Unauthorized error' });
    } else {
      jwt.verify(sessionToken, 'lets_play_sum_games_man', (_err: any, decoded:any) => {
        if (decoded) {
          getUser(decoded.id).then(
            () => {
              // req.body.user = { ...user };
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
