import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl = 'https://diwanet.com/api/news';


  constructor(
    private http: HttpClient
  ) { }

  getNews(): Promise<News[]> {
    return this.http.get<News[]>(this.baseUrl).toPromise();
  }
  getNewsById(params: {
    id: number;
  }): Promise<News> {
    return this.http.get<News>(`${this.baseUrl}/${params.id}`).pipe(map(newsList => newsList[0])).toPromise();
  }
}
