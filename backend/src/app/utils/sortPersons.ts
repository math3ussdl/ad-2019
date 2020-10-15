import { Response } from 'express';
import { Document } from 'mongoose';
import Person from '../models/Person';
import { IMessage } from '../providers/IMailProvider';
import MailService from '../services/MailService';

export const sortPersons = async (personsArr: Document[], res: Response) => {
	const personsSortedArr = [];

	if (personsArr.length % 2 !== 0) {
		return res
			.status(400)
			.json({ msg: 'It takes a couple of people to have a draw!' });
	} else {
		const arr1 = personsArr.slice();
		const arr2 = personsArr.slice();

		arr1.sort(() => 0.5 - Math.random());
		arr2.sort(() => 0.5 - Math.random());

		while (arr1.length) {
			const person1 = arr1.pop();
			const person2 = arr2[0] === person1 ? arr2.pop() : arr2.shift();

			if (person1 === person2) {
				continue;
			}

			await Person.findOne({
				firstName: person1.get('firstName'),
			}).update({ friend: person2.get('firstName') });

			const msg: IMessage = {
				to: person1.get('email'),
				from: process.env.APP_BASE_EMAIL,
				subject: 'Sorteio do Meu Amigo Secreto',
				text: 'Um novo sorteio foi realizado!',
				html: `<p>Parabéns! Você tirou ${person2.get(
					'firstName'
				)}, não se esqueça de dar um presente bacana para ele(a)</p>`,
			};

			const mailService = new MailService(msg);

			mailService.sendMail();

			personsSortedArr.push({ person1, person2 });
		}
	}

	return personsSortedArr;
};
