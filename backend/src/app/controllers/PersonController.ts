import { Request, Response } from 'express';
import Person, { IPerson, IPersonUpdate } from '../models/Person';

class PersonController {
	public async create(req: Request, res: Response) {
		const data: IPerson = req.body;

		const person = await Person.findOne({ email: data.email });

		if (person) {
			return res.status(400).json({
				msg: 'Person Already Exists!',
			});
		}

		const newPerson = await Person.create(data);

		return res.status(200).json({ person: newPerson });
	}

	public async list(req: Request, res: Response) {
		const persons = await Person.find();

		return res.status(200).json(persons);
	}

	public async findOne(req: Request, res: Response) {
		const { id } = req.params;

		const person = await Person.findOne({ _id: id });

		if (!person) {
			return res.status(404).json({ msg: 'Person Not Found!!' });
		}

		return res.status(200).json(person);
	}

	public async update(req: Request, res: Response) {
		const { id } = req.params;
		const data: IPersonUpdate = req.body;

		const person = await Person.findOne({ _id: id });

		if (!person) {
			return res.status(404).json({ msg: 'Person Not Found!!' });
		}

		const isUpdated = await Person.updateOne({ _id: id }, data)
			.then(() => true)
			.catch(() => false);

		return res
			.status(isUpdated === true ? 200 : 400)
			.json(
				isUpdated === true
					? { msg: 'Person Successful Updated!!' }
					: { msg: 'Oops... Person Not Updated!!! Try Again.' }
			);
	}

	public async delete(req: Request, res: Response) {
		const { id } = req.params;

		const person = await Person.findOne({ _id: id });

		if (!person) {
			return res.status(404).json({ msg: 'Person Not Found!!' });
		}

		const isDeleted = await Person.deleteOne({ _id: id })
			.then(() => true)
			.catch(() => false);

		return res
			.status(isDeleted === true ? 200 : 400)
			.json(
				isDeleted === true
					? { msg: 'Person Successful Removed!!' }
					: { msg: 'Oops... Person Not Removed!!! Try Again.' }
			);
  }
}

export default new PersonController();
