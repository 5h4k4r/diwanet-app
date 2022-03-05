import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  //#region Fields
  private _readySubject$ = new Subject();
  private _isReady$ = this._readySubject$.toPromise();
  private _user = new BehaviorSubject(null);

  //#endregion


  //#region Properties

  get isReady$(): Promise<unknown> {
    return this._isReady$;
  }

  get user(): Observable<User> {
    return this._user.asObservable();
  }
  get userValue(): User {
    return this._user.value;
  }


  //#endregion


  //#region Constructor

  constructor(
  ) {
  }


  //#endregion
  setUser(user: User): void {
    this._user.next(user);
  }

  //#region Functions

  //#endregion

}
