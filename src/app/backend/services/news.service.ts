/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { News } from '../models/news.model';
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl = 'https://diwanet.com/api/news';


  constructor(
    private http: HttpClient
  ) { }

  getNews(params?: {
    page?: number;
    limit?: number;
    location_id: number;
  }): Promise<News[]> {
    return this.http.get<News[]>(this.baseUrl, { params }).toPromise();
  }

  getNewsById(params: {
    id: number;
  }): Promise<News> {
    return this.http.get<News>(`${this.baseUrl}/${params.id}`).pipe(map(newsList => newsList[0])).toPromise();
  }

  addNews(params: {
    title: string;
    detail: string;
    images: string[];
  }): Promise<News> {

    return this.http.post<News>(this.baseUrl, params).toPromise();
  }
}
