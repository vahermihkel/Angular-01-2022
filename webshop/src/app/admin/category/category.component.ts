import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => {
      const newArray = [];
      for (const key in res) {
        newArray.push(res[key]);
      }
      this.categories = newArray;
    });
  }

  onSubmit(addCategoryForm: NgForm) {
    if (addCategoryForm.valid) {
      this.categoryService.addCategory(addCategoryForm.value).subscribe(()=>{
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
    this.categoryService.replaceCategories(this.categories).subscribe(()=>{
        this._toastService.success("Kategooria nimega " + category.name + " edukalt kustutatud!");
    });
  }

}
