import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { IdUniquenessService } from 'src/app/services/id-uniqueness.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  private products: Product[] = [];
  idEntered!: number;
  buttonDisabled: boolean = true;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private idUniqService: IdUniquenessService) { }

  ngOnInit(): void {
    this.getCategoriesFromDatabase();
    this.getProductsFromDatabase();
  }

  private getCategoriesFromDatabase(): void {
    this.categoryService.getCategories().subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.categories = newArray;
    });
  }

  private getProductsFromDatabase(): void {
    this.productService.getProducts().subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.products = newArray;
    });
  }

  onCheckIdUniqueness(): void {
    if (this.idEntered && this.idEntered.toString().length === 8) {
      // const index = this.products.findIndex(element => element.id === this.idEntered);
      // if (index === -1) {
      //   this.buttonDisabled = false;
      // } else {
      //   this.buttonDisabled = true;
      // }
      this.idUniqService.onCheckIdUniqueness(this.idEntered,
        this.products)
    }
  }

  onSubmit(addProductForm: NgForm): void {
    if (addProductForm.valid) {
      this.productService.addProduct(addProductForm.value).subscribe(()=>{
        addProductForm.reset();
        this.getProductsFromDatabase();
      });
    }
  }

}
