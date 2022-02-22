import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products: Product[] = []

  constructor(private http: HttpClient,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.http.get<Product[]>("https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json").subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.products = newArray;
    });
  }

  onDeleteProduct(product: Product) {
        // kui on võimalus kasutada .indexOf("OTSITAV"), siis kasutan seda, sest see on lihtsam
        // kui ei ole, kasutan .findIndex(element => element.OMADUS === "VÕRRELDAV");
    const index = this.products.indexOf(product);
    this.products.splice(index,1);
    // uuesti Firebase-i lisada
    this.http.put(
      "https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json", 
      this.products).subscribe(()=>{
        this._toastService.success("Toode ID-ga " + product.id + " edukalt kustutatud!");
    });
  }

}
