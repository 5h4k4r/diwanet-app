import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = 'https://diwanet.com/api/post';
  constructor(
    private http: HttpClient
  ) { }


  getCustomerPosts(): Promise<Post[]> {
    return this.http.post<Post[]>(`${this.baseUrl}/customer`, {}).toPromise();
  }

}
