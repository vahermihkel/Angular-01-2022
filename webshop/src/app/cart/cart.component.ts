import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: CartProduct[] = [];

  constructor() { }

  ngOnInit(): void {
    const productsLS = sessionStorage.getItem("cart");
    if (productsLS) {
      this.products = JSON.parse(productsLS);
    }
  }

  onDecreaseQuantity(product: CartProduct) {
    product.quantity--;
    if (product.quantity === 0) {
      this.onRemoveFromCart(product);
    }
    sessionStorage.setItem("cart", JSON.stringify(this.products));
  }

  onIncreaseQuantity(product: CartProduct) {
    product.quantity++;
    sessionStorage.setItem("cart", JSON.stringify(this.products));
  }

  onRemoveFromCart(product: CartProduct) {
    const index = this.products.indexOf(product);
    this.products.splice(index,1);
    sessionStorage.setItem("cart", JSON.stringify(this.products));
  }

}
