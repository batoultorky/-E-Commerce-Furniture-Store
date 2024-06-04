import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CategoriesComponent } from './components/all-products/categories/categories.component';
import { ProductsTitleComponent } from './components/all-products/products-title/products-title.component';
import { ProductComponent } from './components/all-products/product/product.component';
import { ProductDetailsComponent } from './components/all-products/product/product-details/product-details.component';
import { RattingComponent } from './components/all-products/ratting/ratting.component';
import { ProductCartComponent } from './components/all-products/product/product-cart/product-cart.component';
import { CartCheckOutComponent } from './components/all-products/product/product-cart/cart-check-out/cart-check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { ProductTableComponent } from './components/admin/product-table/product-table.component';
import { UserTableComponent } from './components/admin/user-table/user-table.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AddAdminComponent } from './components/admin/user-table/add-admin/add-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    CategoriesComponent,
    ProductsTitleComponent,
    ProductComponent,
    ProductDetailsComponent,
    RattingComponent,
    ProductCartComponent,
    CartCheckOutComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FormComponent,
    ProductTableComponent,
    UserTableComponent,
    AddProductComponent,
    AdminHomeComponent,
    AddAdminComponent,
      
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
