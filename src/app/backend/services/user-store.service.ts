import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  //#region Fields
  private _readySubject$ = new Subject();
  private _isReady$ = this._readySubject$.toPromise();
  private _user: User | undefined;

  //#endregion


  //#region Properties

  get isReady$(): Promise<unknown> {
    return this._isReady$;
  }

  get user(): User | undefined {
    return this._user;
  }


  //#endregion


  //#region Constructor

  constructor(
  ) {
  }


  //#endregion


  //#region Functions

  //#endregion

}
