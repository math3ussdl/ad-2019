import express, { Application, json, urlencoded } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from '../routes';

class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.setMiddlewares();
		this.DBConnect();
	}

	private setMiddlewares() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(routes);
	}

	private async DBConnect() {
		await mongoose
			.connect(process.env.MONGODB_URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			})
			.then(() => console.log('Database is Connected!'))
			.catch(err =>
				console.log(`Database is NOT Connected! \n Reason: ${err}`)
			);
	}
}

export default new App().app;
