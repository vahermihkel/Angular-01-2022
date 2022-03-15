import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { IdUniquenessService } from 'src/app/services/id-uniqueness.service';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private _toastService: ToastService,
    private idUniqService: IdUniquenessService) { }

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
    this.categoryService.getCategories().subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.categories = newArray;
    });
  }

  private getProductFromDatabase() {
    this.productService.getProducts().subscribe(res => {
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
      id: new FormControl(this.product.id,Validators.required),
      name: new FormControl(this.product.name, [Validators.required, Validators.email]),
      price: new FormControl(this.product.price),
      description: new FormControl(this.product.description),
      imgSrc: new FormControl(this.product.imgSrc, Validators.pattern(/^\S*$/)),
      category: new FormControl(this.product.category),
      isActive: new FormControl(this.product.isActive),
    });
  }


  onCheckIdUniqueness() {
    if (this.idEntered && this.idEntered.toString().length === 8) {
      this.buttonDisabled = this.idUniqService.onCheckIdUniqueness(
              this.idEntered, this.products, this.product);
    }
  }

  onSubmit() {
    this.products[this.index] = this.editProductForm.value
    this.productService.replaceProducts(this.products).subscribe( () =>
        {
          window.location.href="/admin/vaata-tooteid"
          this._toastService.success('Toode edukalt muudetud')
        }
      );
  }
}
