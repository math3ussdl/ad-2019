import sgMail from '@sendgrid/mail';
import { IMessage } from '../providers/IMailProvider';

export default class MailService {
	private msg: IMessage;

	constructor(msg: IMessage) {
		this.msg = msg;
		this.defineSecretKey();
	}

	defineSecretKey() {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	}

	sendMail() {
		sgMail
			.send(this.msg)
			.then(() => {
				console.log('Email sent!');
			})
			.catch((error) => {
				console.error(error);
			});
	}
}
