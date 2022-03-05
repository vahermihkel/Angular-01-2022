import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;
  categories: Category[] = [];
  private products: Product[] = [];
  idEntered!: number;
  buttonDisabled: boolean = false;
  id!: number;
  product!: Product;
  index!: number;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.getCategoriesFromDatabase();
    // this.id = window.location.href.split("muuda-toode/")[1];
    let idUrl = this.route.snapshot.paramMap.get("productId");
    if (idUrl) {
      this.id = Number(idUrl);
    }
    this.getProductFromDatabase();
  }

  private getCategoriesFromDatabase() {
    this.http.get<Category[]>("https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/categories.json").subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.categories = newArray;
    });
  }

  private getProductFromDatabase() {
    this.http.get<Product[]>("https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json").subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.products = newArray;
      let productFound = this.products.find(element => element.id === this.id);
      if (productFound) {
        this.index = this.products.indexOf(productFound);
        this.product = productFound;
        this.initForm();
      }
    });
  }

  private initForm() {
    this.idEntered = this.product.id;
    this.editProductForm = new FormGroup({
      id: new FormControl(this.product.id),
      name: new FormControl(this.product.name),
      price: new FormControl(this.product.price),
      description: new FormControl(this.product.description),
      imgSrc: new FormControl(this.product.imgSrc),
      category: new FormControl(this.product.category),
      isActive: new FormControl(this.product.isActive),
    });
  }


  onCheckIdUniqueness() {
    if (this.idEntered && this.idEntered.toString().length === 8) {
      const index = this.products.findIndex(element => element.id === this.idEntered);
      if (index === -1 || this.product.id === this.idEntered) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
    }
  }

  onSubmit() {
    this.products[this.index] = this.editProductForm.value
    this.http.put("https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      this.products).subscribe( () =>
        {
          window.location.href="/admin/vaata-tooteid"
          this._toastService.success('Toode edukalt muudetud')
        }
      );
  }
}
