/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';
import { TokenStoreService } from './token-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://diwanet.com/api';
  constructor(
    private http: HttpClient,
    private tokenStore: TokenStoreService,
    private storage: LocalStorageService,
    private router: Router,
  ) { }

  //#region Functions
  async login(params: {
    handle: string; password: string;
  }): Promise<any> {
    return await this.http.get(`${this.baseUrl}/login`, { params }).pipe(map((response: { access_token: string; user: User }) => {

      this.tokenStore.applyAuthToken(response.access_token);
      return response;

    })).toPromise();
  }

  async logout(server: boolean = true): Promise<void> {

    if (!server)
      this.localLogout();
    else {
      try {
        if (this.tokenStore.accessToken)
          await this.http.get<any>(`${this.baseUrl}/logout`).toPromise();
      } catch (error) {

      }
      this.localLogout();
    }
  }

  async register(params: {
    name: string;
    phone: string;
    category_id: number;
    location_id: number;
    price: number;
    price_type: 'day' | 'hour';
    password: string;
    email?: string;
    image?: any;
    about?: string;
    facebook?: string;
    instagram?: string;
    snapchat: string;

  }): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, params).toPromise();
  }
  //#endregion


  //#region Private Methods
  private localLogout(): void {
    this.tokenStore.clearAuthToken();
    // this.router.navigateByUrl('/auth/login');
  }
  //#endregion
}
