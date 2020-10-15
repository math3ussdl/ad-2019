import { Request, Response } from 'express';
import { sortPersons } from '../utils/sortPersons';
import Person from '../models/Person';

class RaffleController {
	public async create(req: Request, res: Response) {
		const persons = await Person.find();

		const result = await sortPersons(persons, res);

		return res.status(200).json({ result });
	}
}

export default new RaffleController();
