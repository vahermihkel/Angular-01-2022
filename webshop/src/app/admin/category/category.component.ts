import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  constructor(private http: HttpClient,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.http.get<Category[]>("https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/categories.json").subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.categories = newArray;
    });
  }

  onSubmit(addCategoryForm: NgForm) {
    if (addCategoryForm.valid) {
      this.http.post(
        "https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/categories.json", 
        addCategoryForm.value).subscribe(()=>{
          this.categories.push(addCategoryForm.value);
          addCategoryForm.reset();
          this._toastService.success('Kategooria edukalt lisatud');
      });
    }
  }

  onDeleteCategory(category: Category) {
    const index = this.categories.indexOf(category);
    this.categories.splice(index,1);
    // uuesti Firebase-i lisada
    this.http.put(
      "https://webshop-01-2022-default-rtdb.europe-west1.firebasedatabase.app/categories.json", 
      this.categories).subscribe(()=>{
        this._toastService.success("Kategooria nimega " + category.name + " edukalt kustutatud!");
    });
  }

}
