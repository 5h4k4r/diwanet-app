import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = 'https://diwanet.com/api/posts';
  constructor(
    private http: HttpClient
  ) { }


  getCustomerPosts(params?: {
    page?: number;
    limit?: number;
  }): Promise<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`, { params }).toPromise();
  }

}
