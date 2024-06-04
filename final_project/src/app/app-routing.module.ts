import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductCartComponent } from './components/all-products/product/product-cart/product-cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/all-products/product/product.component';
import { FormComponent } from './components/form/form.component';
import { ProductTableComponent } from './components/admin/product-table/product-table.component';
import { UserTableComponent } from './components/admin/user-table/user-table.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AddAdminComponent } from './components/admin/user-table/add-admin/add-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: AllProductsComponent },
  { path: 'products/cart', component: ProductCartComponent },
  { path: 'form', component: FormComponent },
  { path: 'product_table', component: ProductTableComponent },
  { path: 'user_table', component: UserTableComponent },
  { path: 'add_product/:id/edit', component: AddProductComponent },
  { path: 'add_admin', component: AddAdminComponent },
  { path: 'admin_page', component: AdminHomeComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
