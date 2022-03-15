import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products: Product[] = []; 
  private originalProducts: Product[] = [];
  searchedProduct: string = "";
  descriptionWords: number = 2;

  constructor(private productService: ProductService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.products = newArray;
      this.originalProducts = newArray;
    });
  }

  onSearchProducts() {
    this.products = this.originalProducts.filter(element => 
        element.name.toLowerCase().indexOf(this.searchedProduct.toLowerCase()) > -1 ||
        element.id.toString().indexOf(this.searchedProduct) > -1
      );
  }

  onDeleteProduct(product: Product) {
        // kui on võimalus kasutada .indexOf("OTSITAV"), siis kasutan seda, sest see on lihtsam
        // kui ei ole, kasutan .findIndex(element => element.OMADUS === "VÕRRELDAV");
    const index = this.products.indexOf(product);
    this.products.splice(index,1);
    // uuesti Firebase-i lisada
    this.productService.replaceProducts(this.products).subscribe(()=>{
        this._toastService.success("Toode ID-ga " + product.id + " edukalt kustutatud!");
    });
  }

  changeActive(product: Product) {
    product.isActive = !product.isActive;
    this.productService.replaceProducts(this.products).subscribe();
  }

}
