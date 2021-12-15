import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'https://diwanet.com/public/api/categories';
  constructor(
    private http: HttpClient,
  ) {
  }


  getCategories(params?: {
    page?: number;
    limit?: number;
  }): Promise<Category[]> {
    return this.http.get<Category[]>(this.baseUrl, { params }).toPromise();
  }
}
