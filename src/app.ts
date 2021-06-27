import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { logerRequests } from './middlewares/logger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/tasks.router';
import {
  handleError, ErrorHandler, uncaughtException, unhandledRejection
} from './middlewares/error.handler';
import { validateSession } from './middlewares/validate.session';
import { userLogin } from './middlewares/login.handler';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logerRequests);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  } next();
});
app.use('/login', userLogin);
app.use('/users', validateSession, userRouter);
app.use('/boards', validateSession, boardRouter);
app.use('/boards/:boardsId/tasks', validateSession, taskRouter);
app.use((err:ErrorHandler, _req:Request, res:Response, next:NextFunction) => {
  handleError(err, res);
  next();
});

process.on('uncaughtException', uncaughtException);
process.on('unhandledRejection', unhandledRejection);

export default app;
