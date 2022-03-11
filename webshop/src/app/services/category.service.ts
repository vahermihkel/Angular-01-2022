import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = "https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.url);
  }

  addCategory(category: Category) {
    return this.http.post(this.url, category);
  }

  replaceCategories(categories: Category[]) {
    return this.http.put(this.url, categories);
  }
}
