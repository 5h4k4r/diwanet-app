import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {

  //#region Fields
  private _readySubject$ = new Subject();
  private _isReady$ = this._readySubject$.toPromise();
  private _auth: any = {};
  //#endregion

  //#region Properties
  get isReady$(): Promise<unknown> {
    return this._isReady$;
  }

  get accessToken(): string | null | undefined {
    return this._auth.accessToken;
  }

  get refreshToken(): string | null | undefined {
    return this._auth.refreshToken;
  }
  //#endregion

  //#region Constructor
  constructor(private storage: LocalStorageService) {

    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key !== 'token') return;

      if (!event.oldValue || !event.newValue)
        location.reload();

    });

    this._auth = storage.getObject('token', {});
    try {
      const storedToken = storage.getObject('token');
      if (storedToken) {
        this.applyAuthToken(storedToken);
      }

    } catch (_) {
      this.clearAuthToken();
    }
    this._readySubject$.complete();
  }
  //#endregion

  //#region Functions
  applyAuthToken(authToken: any): void {
    this._auth = authToken;
    this.storage.setObject('token', authToken);
  }

  clearAuthToken(): void {
    this._auth = {};
    this.storage.removeKey('token');
  }

  //#endregion

}
