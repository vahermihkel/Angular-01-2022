import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { CartService } from '../services/cart.service';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: CartProduct[] = [];
  sumOfCart = 0;

  constructor(private cartService: CartService,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    const productsLS = sessionStorage.getItem("cart");
    if (productsLS) {
      this.products = JSON.parse(productsLS);
    }
    this.calculateSumOfCart();
  }

  // HTML-s: (change)="showSelectedPMachine($event)"
  // showSelectedPMachine(event: any) {
  //   this.selectedPMachine = event.target.value;
  // }

  onDecreaseQuantity(product: CartProduct) {
    product.quantity--;
    if (product.quantity === 0) {
      this.onRemoveFromCart(product);
    }
    sessionStorage.setItem("cart", JSON.stringify(this.products));
    this.calculateSumOfCart();
  }

  onIncreaseQuantity(product: CartProduct) {
    product.quantity++;
    sessionStorage.setItem("cart", JSON.stringify(this.products));
    this.calculateSumOfCart();
  }

  onRemoveFromCart(product: CartProduct) {
    const index = this.products.indexOf(product);
    this.products.splice(index,1);
    sessionStorage.setItem("cart", JSON.stringify(this.products));
    this.calculateSumOfCart();
  }

  private calculateSumOfCart() {
    this.sumOfCart = this.cartService.calculateCartSum(this.products);
    this.cartService.cartChanged.next(this.products);
  }

  onPay() {
    this.paymentService.makePayment(this.sumOfCart).subscribe();
  }

}
