import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  baseUrl = 'https://diwanet.com/public/api/settings';

  constructor(
    private http: HttpClient,
  ) { }


  getSettings(): Promise<any> {
    return this.http.get<any>(this.baseUrl).toPromise();
  }
}
