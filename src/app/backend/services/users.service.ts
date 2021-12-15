/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceMan } from '../models/serviceman.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //#region Fields

  baseUrl = 'https://diwanet.com/public/api/users';

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
    page?: number;
    limit?: number;
    location_id: number;
  }): Promise<ServiceMan[]> {
    this.filterFields(params);
    return this.http.get<ServiceMan[]>(`${this.baseUrl}/servicemen`, { params: this.filterFields(params) }).toPromise();
  }

  getUserById(params?: { id: string }): Promise<ServiceMan> {
    return this.http.get<ServiceMan>(`${this.baseUrl}/servicemen`,
      { params: this.filterFields(params) }
    ).toPromise();
  }

  reviewUser(params?: {
    id_service_man: number;
    comment?: string;
    stars: number;
  }): Promise<any> {
    return this.http.post(`https://diwanet.com/public/api/review`, params).toPromise();
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
