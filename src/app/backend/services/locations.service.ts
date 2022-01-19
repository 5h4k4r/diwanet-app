import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from 'src/app/backend/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  baseUrl = 'https://diwanet.com/public/api/countries';

  constructor(
    private http: HttpClient
  ) { }


  listCities(params: {
    id: number;
  }): Promise<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/${params.id}`).toPromise();
  }

  listCountries(): Promise<Location[]> {
    return this.http.get<Location[]>(this.baseUrl).toPromise();
  }
}
