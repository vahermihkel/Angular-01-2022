import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { IdUniquenessService } from 'src/app/services/id-uniqueness.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
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
  selectedFile!: File;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private idUniqService: IdUniquenessService,
    private imageUpload: ImageUploadService) { }

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
      this.buttonDisabled = this.idUniqService.onCheckIdUniqueness(this.idEntered,
        this.products)
    }
  }

  handleFileInput(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  sendPictureToDb() {
    this.imageUpload.uploadPicture(this.selectedFile);
  }

  onSubmit(addProductForm: NgForm): void {
    console.log(addProductForm.value);
    const url = this.imageUpload.uploadedPictureUrl;
    if (url === "") {
      const isOk = confirm("Oled lisamas toodet ilma pildita, kas oled kindel?");
      if (isOk) {
        console.log("lähen edasi");
      } else {
        console.log("katkestati");
      }
    }
    if (addProductForm.valid) {
      const val = addProductForm.value;
      const newProduct = new Product(
          val.id,val.name, val.price, url, 
          val.description, val.category, val.isActive
        );
      this.productService.addProduct(newProduct).subscribe(()=>{
        addProductForm.reset();
        this.getProductsFromDatabase();
      });
    }
  }

}
