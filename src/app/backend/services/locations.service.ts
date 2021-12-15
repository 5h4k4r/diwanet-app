import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from 'src/app/backend/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  baseUrl = 'https://diwanet.com/public/api/locations';

  constructor(
    private http: HttpClient
  ) { }


  getLocations(): Promise<Location[]> {
    return this.http.get<Location[]>(this.baseUrl).toPromise();
  }
}
