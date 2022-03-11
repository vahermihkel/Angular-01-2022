import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.url);
  }

  addProduct(product: Product) {
    return this.http.post(this.url, product);
  }

  replaceProducts(products: Product[]) {
    return this.http.put(this.url, products);
  }
}
