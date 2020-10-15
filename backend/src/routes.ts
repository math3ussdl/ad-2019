import { Request, Response, Router } from 'express';
import PersonController from './app/controllers/PersonController';
import RaffleController from './app/controllers/RaffleController';

const route = Router();

route.get('/', (req: Request, res: Response) => res.json({ hello: 'World!' }));

route.post('/persons', PersonController.create);
route.get('/persons', PersonController.list);
route.get('/persons/:id', PersonController.findOne);
route.put('/persons/:id', PersonController.update);
route.delete('/persons/:id', PersonController.delete);

route.post('/persons/raffle', RaffleController.create);

export default route;
