import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartProduct } from '../models/cart-product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sumOfCart = 0;

  constructor(private translate: TranslateService,
    private cartService: CartService) { }

  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang) {
      this.useLanguage(lang);
    } else {
      this.useLanguage("ee");
    }
   
    this.cartService.cartChanged.subscribe(products => {
        this.sumOfCart = 0;
        products.forEach(element => 
          this.sumOfCart = this.sumOfCart + element.cartProduct.price * element.quantity);
        });

  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem("language", language);
  }

}
