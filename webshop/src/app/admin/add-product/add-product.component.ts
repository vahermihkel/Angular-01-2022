import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(addProductForm: NgForm) {
    if (addProductForm.valid) {
      this.http.post(
        "https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json", 
        addProductForm.value).subscribe(()=>{
        addProductForm.reset();
      });
    }
  }

}
