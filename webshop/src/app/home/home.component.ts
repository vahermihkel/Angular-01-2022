import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [
    // {
    //   id: 12345678,
    //   name: "Rolex",
    //   price: 12.99,
    //   imgSrc: "http://....-.jpg",
    //   description: "2",
    //   category: "1",
    //   isActive: true
    // }
  ]


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>("https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json").subscribe(res => {
      this.products = res;
    });
  }

  onAddToCart(product: Product): void {
    console.log(product)
  }
}
