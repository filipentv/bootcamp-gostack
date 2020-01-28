import { Router } from 'express';

// import User from './app/models/User';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

/*
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Filipe Natividade',
    email: 'filipentv@gmail.com',
    password_hash: '123456'
  })
    .then(item => res.json(item))
    .catch(err => res.status(500).json(err));

  // return res.json(user);

  // return res.json({ message: 'Hello Word' });
});
*/

export default routes;
