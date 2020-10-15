import { model, Schema } from 'mongoose';

const PersonSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  friend: String,
});

export interface IPerson {
	firstName: string;
	lastName: string;
	email: string;
  friend?: string;
}

export interface IPersonUpdate {
	firstName?: string;
	lastName?: string;
	email?: string;
	friend?: string;
}

export default model('Person', PersonSchema);
