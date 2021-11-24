/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceMan } from '../models/serviceman.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //#region Fields

  baseUrl = 'https://diwanet.com/api/users';

  //#endregion

  //#region Constructor

  constructor(
    private http: HttpClient
  ) { }


  //#endregion


  //#region Functions


  listVIPUsers(params?: {
    service_cat_id?: number;
  }): Promise<ServiceMan[]> {
    return this.http.get<ServiceMan[]>(`${this.baseUrl}/vip`).toPromise();
  }

  listServiceMen(params?: {
    service_cat_id?: number;
  }): Promise<ServiceMan[]> {

    return this.http.get<ServiceMan[]>(`${this.baseUrl}/servicemen`, { params: { service_cat_id: params.service_cat_id } }).toPromise();
  }

  getUserById(params?: { id: string }): Promise<ServiceMan> {
    return this.http.get<ServiceMan>(`${this.baseUrl}/servicemen/${params.id}`).pipe(map(users => users[0])).toPromise();
  }

  reviewUser(params?: {
    id_service_man: number;
    comment?: string;
    stars: number;
  }): Promise<any> {
    return this.http.post(`https://diwanet.com/api/review`, params).toPromise();
  }
  //#endregion
}
