import { Router } from 'express';

// Controllers
import UserController from './app/controllers/UserController';

// Middlewares
import validateUserStore from './app/validators/User/Store';
import validateUserUpdate from './app/validators/User/Update';

const routes = new Router();

// User's
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users/:id', validateUserUpdate, UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
