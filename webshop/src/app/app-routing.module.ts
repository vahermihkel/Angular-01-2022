import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CategoryComponent } from './admin/category/category.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ShopsComponent } from './shops/shops.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "ostukorv", component: CartComponent },
  { path: "toode", component: SingleProductComponent },
  { path: "logi-sisse", component: LoginComponent },
  { path: "poed", component: ShopsComponent },
  { path: "admin", canActivateChild:[AuthGuard], children: [
    { path: "", component: AdminHomeComponent },
    { path: "lisa-toode", component: AddProductComponent },
    { path: "muuda-toode/:productId", component: EditProductComponent },
    { path: "vaata-tooteid", component: ViewProductsComponent },
    { path: "kategooria", component: CategoryComponent },
    { path: "registreeru", component: SignupComponent },
  ] },
  // { path: "**", component: NotFoundComponent },
  // { path: "**", redirectTo: "" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
