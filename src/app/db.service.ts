import { Injectable } from '@angular/core';
import * as mongoose from "mongoose";

import { Celebs, CelebsModel, Users, UsersModel, Verbs, VerbsModel } from './data-models';

declare interface IModels {
  Celebs: CelebsModel;
  Users: UsersModel;
  Verbs: VerbsModel;
}

@Injectable({
  providedIn: 'root'
})
export class DBService {
  private static instance: DBService;
    
  private _db: mongoose.Connection;

  private _models: IModels;

  constructor() { 
    const options: mongoose.ConnectionOptions = { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    };
    console.log(mongoose);
    mongoose.connect('mongodb://127.0.0.1/paoBuddy', options).then(() => { console.log('Connected to mongodb')}, (err) => { console.log('There was an error.'); });
    this._db = mongoose.connection;
    this._db.on('open', this.connected);
    this._db.on('error', this.error);

    this._models = {
      Celebs: new Celebs().model, 
      Users: new Users().model,
      Verbs: new Verbs().model
    }
  }

  public static get Models() {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }
    return DBService.instance._models;
  }

  private connected() {
    console.log('Mongoose has connected.');
  }

  private error(error: any) {
    console.log('Mongoose has errored:', error);
  }

}
