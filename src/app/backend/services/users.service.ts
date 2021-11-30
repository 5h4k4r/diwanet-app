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


  listServiceMen(params?: {
    service_cat_id?: number;
    vip?: boolean;
  }): Promise<ServiceMan[]> {
    this.filterFields(params);
    return this.http.get<ServiceMan[]>(`${this.baseUrl}/servicemen`, { params: this.filterFields(params) }).toPromise();
  }

  getUserById(params?: { id: string }): Promise<ServiceMan> {
    return this.http.get<ServiceMan>(`${this.baseUrl}/servicemen`,
      { params: this.filterFields(params) }
    ).pipe(map(users => users[0])).toPromise();
  }

  reviewUser(params?: {
    id_service_man: number;
    comment?: string;
    stars: number;
  }): Promise<any> {
    return this.http.post(`https://diwanet.com/api/review`, params).toPromise();
  }

  private filterFields(params: any): any {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        if (params[key] === undefined || params[key] === null)
          delete params[key];
      }
    }
    return params;
  }
  //#endregion
}
