import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { ParcelMachine } from '../models/parcel-machine.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: CartProduct[] = [];
  sumOfCart = 0;
  parcelMachines: ParcelMachine[] = [];
  originalParcelMachines: ParcelMachine[] = [];
  selectedCounty: string = "";
  selectedPMachine: string = "";

  constructor(private cartService: CartService,
    private http: HttpClient) { }

  ngOnInit(): void {
    const productsLS = sessionStorage.getItem("cart");
    if (productsLS) {
      this.products = JSON.parse(productsLS);
    }
    this.calculateSumOfCart();
    this.http.get<ParcelMachine[]>("https://www.omniva.ee/locations.json").subscribe(response => {
        this.originalParcelMachines = response.filter(element => element.A0_NAME === "EE");
        this.parcelMachines = this.originalParcelMachines;
    });
  }

  showParcelMachinesByCounty() {
    this.parcelMachines = this.originalParcelMachines.filter(element => 
                                  element.A1_NAME === this.selectedCounty);
  }

  // HTML-s: (change)="showSelectedPMachine($event)"
  // showSelectedPMachine(event: any) {
  //   this.selectedPMachine = event.target.value;
  // }

  deleteSelectedPMachine() {
    this.selectedPMachine = "";
  }

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
    this.sumOfCart = 0
    this.products.forEach(element => this.sumOfCart = this.sumOfCart + element.cartProduct.price * element.quantity )
    this.cartService.cartChanged.next(this.products);
  }

}
