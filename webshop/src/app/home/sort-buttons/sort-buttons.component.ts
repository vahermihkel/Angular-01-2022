import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-sort-buttons',
  templateUrl: './sort-buttons.component.html',
  styleUrls: ['./sort-buttons.component.css']
})
export class SortButtonsComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
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

}
