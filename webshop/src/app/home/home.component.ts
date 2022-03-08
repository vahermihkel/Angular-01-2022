import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { Product } from '../models/product.model';
import { UniquePipe } from '../pipes/unique.pipe';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = [
    "https://picsum.photos/id/700/900/500",
    "https://picsum.photos/id/533/900/500",
    "https://picsum.photos/id/807/900/500",
    "https://picsum.photos/id/124/900/500",
  ];

  // 1. ngFor kujule
  // 2. Objektideks - URL, header, text, alt
  // header1, header2, header3
  // text1, text2, text3
  // alt1, alt2, alt3

  // kuup2ev = new Date();
  // numbriline = 0.5;
  // suuremNUmber = 100312;

  products: Product[] = []; // 3. muudan filter() -- kellel on samasugune kategooria nagu valitud
  originalProducts: Product[] = []; // 1.et saada originaali tagasi et uuesti filterdada
  categories: string[] = []; // 2.kuvan välja ---> võtan iga toote küljest (originaalmassiivist)

  constructor(private http: HttpClient,
    private cartService: CartService,
    private uniquePipe: UniquePipe) { }

  ngOnInit(): void {
    this.http.get<Product[]>("https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json").subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.originalProducts = newArray;
      this.products = this.originalProducts.slice();

      // this.categories = this.originalProducts.map(element => element.category);
      this.categories = this.uniquePipe.transform(this.originalProducts,"category");
    });
  }

  onSelectCategory(category: string) {
    if (category == "all") {
      this.products = this.originalProducts.slice();
    } else {
      this.products = this.originalProducts.filter(element => element.category == category);
    }
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
