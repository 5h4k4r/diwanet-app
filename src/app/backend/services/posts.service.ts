/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = 'https://diwanet.com/public/api/posts';
  constructor(
    private http: HttpClient
  ) { }


  getPosts(params?: {
    page?: number;
    limit?: number;
    location_id: number;
  }): Promise<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`, { params }).toPromise();
  }

  getSingle(params: {
    location_id: number;
    id: number;
    phone?: string;
    code?: string;
  }): Promise<Post> {
    return this.http.get<Post>(`${this.baseUrl}`, { params }).toPromise();
  }

  addPost(params: {
    name: string;
    phone: string;
    category_id: number;
    detail: string;
    location_id: number;
  }): Promise<Post> {

    return this.http.post<Post>(this.baseUrl, params).toPromise();
  }

}
