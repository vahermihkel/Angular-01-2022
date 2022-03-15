import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { UniquePipe } from '../pipes/unique.pipe';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // kuup2ev = new Date();
  // numbriline = 0.5;
  // suuremNUmber = 100312;

  products: Product[] = []; // 3. muudan filter() -- kellel on samasugune kategooria nagu valitud
  originalProducts: Product[] = []; // 1.et saada originaali tagasi et uuesti filterdada
  categories: string[] = []; // 2.kuvan välja ---> võtan iga toote küljest (originaalmassiivist)
  isLoggedIn = false;

  constructor(private productService: ProductService,
    private uniquePipe: UniquePipe,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.originalProducts = newArray;
      this.products = this.originalProducts.slice();

      // this.categories = this.originalProducts.map(element => element.category);
      this.categories = this.uniquePipe.transform(this.originalProducts,"category");
    });

    this.authService.loggedInChanged.subscribe(() => { // <--- Subject()
      this.isLoggedIn = sessionStorage.getItem("userData") !== null; // <--- BehaviorSubject
    })
  }

  onSelectCategory(category: string) {
    if (category == "all") {
      this.products = this.originalProducts.slice();
    } else {
      this.products = this.originalProducts.filter(element => element.category == category);
    }
  }

}
