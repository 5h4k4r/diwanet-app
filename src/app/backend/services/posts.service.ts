import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = 'https://diwanet.com/api/';
  constructor(
    private http: HttpClient
  ) { }


}
