/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl = 'https://diwanet.com/public/api/comments';
  constructor(
    private http: HttpClient
  ) { }

  addComment(params: {
    customer_post_id: number;
    comment: number;
  }): Promise<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}`, params).toPromise();
  }
}
