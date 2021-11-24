import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'https://diwanet.com/api/categories';
  constructor(
    private http: HttpClient,
  ) {
  }


  listCategories(): Promise<Category[]> {
    return this.http.get<Category[]>(this.baseUrl).toPromise();
  }
}
