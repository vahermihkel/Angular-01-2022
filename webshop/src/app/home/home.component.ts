import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>("https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json").subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.products = newArray;
    });
  }

  onSortNameAsc() {
    this.products.sort((a,b) => a.name.localeCompare(b.name));
  }

  onSortNameDesc() {
    this.products.sort((a,b) => b.name.localeCompare(a.name));
  }

  onSortPriceAsc() {
    this.products.sort((a,b) => a.price - b.price);
  }

  onSortPriceDesc() {
    this.products.sort((a,b) => b.price - a.price);
  }

  // {name:"A", price: 5}
  // [] -> [{name:"A", price: 5}] -> [{name:"A", price: 5},{name:"A", price: 5}]
  // [] -> [{cartProduct:{name:"A", price: 5},quantity:1}] -> [{cartProduct:{name:"A", price: 5},quantity:2}]
  onAddToCart(product: Product): void {
    console.log(product);
    // kas on selline võti ostukorvis (sessionStorage)
    const cartProductsLS = sessionStorage.getItem("cart");
    if (cartProductsLS) {
        const cartProducts: CartProduct[] = JSON.parse(cartProductsLS);
        // kas on selline selline toode olemas??? otsime järjekorranumbri alusel
        // sessionStorage-st saadud toodete seest
        // kui järjekorranumber on -1, järelikult sellist pole
        const index = cartProducts.findIndex(element => element.cartProduct.id === product.id);
        if (index !== -1) {
          cartProducts[index].quantity++;
        } else {
          cartProducts.push({cartProduct: product, quantity: 1});
        }
        sessionStorage.setItem("cart", JSON.stringify(cartProducts));
        // kas on selline toode juba olemas --- suurenda quantity
        // kui ei ole sellist toodet olemas --- push()

    } else {
    // ei ole sellist võtit
      const cartProducts = [{cartProduct: product, quantity: 1}];
      sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }
}
