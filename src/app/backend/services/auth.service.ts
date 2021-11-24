import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://diwanet.com/api/';
  constructor(
    private http: HttpClient
  ) { }


  // async login(params?: {
  //   handle: string; password: string;
  // }): Promise<any> {
  //   return await this.http.get().toPromise();
  // }
}
