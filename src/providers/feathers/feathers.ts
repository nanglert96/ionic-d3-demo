import { Injectable } from '@angular/core';

// feathers imports; copying example at:
// https://github.com/feathersjs/feathers-chat-angular/blob/master/src/app/services/feathers.service.ts
import * as feathers from 'feathers/client';
import * as feathersRx from 'feathers-reactive';
import * as io from 'socket.io-client';
import * as hooks from 'feathers-hooks';
import * as socketio from 'feathers-socketio/client';
// import * as authentication from 'feathers-authentication-client';

@Injectable()
export class FeathersProvider {

  private _feathers: any;
  private _socket: any;

  constructor() {
    this._socket = io('http://api.smartclickr.dev.com');
    this._feathers = feathers();
    this._feathers.configure(hooks());
    this._feathers.configure(feathersRx({idField: '_id'}));
    this._feathers.configure(socketio(this._socket));
    // this._feathers.configure(authentication({
    //   storage: localStorage
    // }));
  }

  service = (name: string): any => this._feathers.service(name);

  // authenticate = (credentials?): Promise<any> => this._feathers.authenticate(credentials);

  // logout = (): any => this._feathers.logout();
}
