import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  // {name:"A", price: 5}
  // [] -> [{name:"A", price: 5}] -> [{name:"A", price: 5},{name:"A", price: 5}]
  // [] -> [{cartProduct:{name:"A", price: 5},quantity:1}] -> [{cartProduct:{name:"A", price: 5},quantity:2}]
  onAddToCart(product: Product): void {
    console.log(product);
    // kas on selline võti ostukorvis (sessionStorage)
    const cartProductsLS = sessionStorage.getItem("cart");
    let cartProducts: CartProduct[] = [];
    if (cartProductsLS) {
        cartProducts = JSON.parse(cartProductsLS);
        // kas on selline selline toode olemas??? otsime järjekorranumbri alusel
        // sessionStorage-st saadud toodete seest
        // kui järjekorranumber on -1, järelikult sellist pole
        const index = cartProducts.findIndex(element => 
          element.cartProduct.id === product.id);
        if (index !== -1) {
          cartProducts[index].quantity++;
        } else {
          cartProducts.push({cartProduct: product, quantity: 1});
        }
        // kas on selline toode juba olemas --- suurenda quantity
        // kui ei ole sellist toodet olemas --- push()

    } else {
        // ei ole sellist võtit
        cartProducts = [{cartProduct: product, quantity: 1}];
    }
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    this.cartService.cartChanged.next(cartProducts);
  }

}
