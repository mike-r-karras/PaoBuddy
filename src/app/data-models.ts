import { Schema, model, Document, Model } from 'mongoose';

declare interface ICelebs extends Document {
  name: string;
  description: string;
  image: string;
}

export interface CelebsModel extends Model<ICelebs> {};

export class Celebs {
  private _model: Model<ICelebs>;

  constructor() {
    const schema = new Schema({
      name: { type: String, required: true },
      description: { type: String },
      image: { type: String }
    });
    this._model = model<ICelebs>('Celeb', schema);
  }

  public get model(): Model<ICelebs> {
    return this._model
  }
}

declare interface IUsers extends Document {
  name: string;
  password: string;
}

export interface UsersModel extends Model<IUsers> {};

export class Users {
  private _model: Model<IUsers>;

  constructor() {
    const schema = new Schema({
    name: { type: String, required: true},
    password: { type: String, required: true }
    });
    this._model = model<IUsers>('User', schema);
  }

  public get model(): Model<IUsers> {
    return this._model
  }
}

declare interface IVerbs extends Document {
  verb: String;
}

export interface VerbsModel extends Model<IVerbs> {};

export class Verbs {
  private _model: Model<IVerbs>;

  constructor() {
    const schema = new Schema({
      verb: { type: String }
    });
    this._model = model<IVerbs>('Verb', schema);
  }

  public get model(): Model<IVerbs> {
    return this._model
  }
}
