import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { CategoryProducts } from '../model/category-products';
import { CartService } from 'src/app/Services/cart.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  categoryNum: number = 0;
  modalID: number = 0;
  details: boolean = false;
  layoutGrid: boolean = true;
  products: any;
  productsInCart: any;
  tempCart: any;
  lightsProducts: CategoryProducts[] = [];
  sofaProducts: CategoryProducts[] = [];
  officeProducts: CategoryProducts[] = [];
  swingChairProducts: CategoryProducts[] = [];
  productsList: CategoryProducts[][] = [];
  productsShow: CategoryProducts[] = [];

  activeCategories: boolean[] = [];
  constructor(public p: ProductsService, public cartService: CartService, public router: Router) {
    this.activeCategories = [true, false, false, false];
  }
  ngOnInit(): void {
    if (localStorage.getItem("usertoken") == '' || localStorage.getItem("usertoken") == null) {
      localStorage.setItem("goToPage", "product")
      this.router.navigate(['/form']);
    }
    else {
      if (localStorage.getItem("userRole") == "User") {
        this.router.navigate(['/products']);
        // console.log("habibauser");
      }
      else if (localStorage.getItem("userRole") == "Admin") {
        this.router.navigate(['/admin_page']);
        // console.log("habibaAdmin");
      }
    }
    this.p.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category == "Modern_Sofa") this.sofaProducts.push(this.products[i]);
          else if (this.products[i].category == "Office_Set") this.officeProducts.push(this.products[i]);
          else if (this.products[i].category == "Lighting") this.lightsProducts.push(this.products[i]);
          else if (this.products[i].category == "Swing_Chair") this.swingChairProducts.push(this.products[i]);
        }
        this.productsList.push(this.lightsProducts);
        this.productsList.push(this.sofaProducts);
        this.productsList.push(this.swingChairProducts);
        this.productsList.push(this.officeProducts);
        this.productsShow = this.lightsProducts;
      },
      error: (e) => {
      },
    })
    if (!localStorage.getItem(`productsInCart${localStorage.getItem("username")}`) == null || localStorage.getItem(`productsInCart${localStorage.getItem("usertoken")}`) != ' ') {
      console.log("num1");

      this.productsInCart = [];
    }
    else {
      console.log("num2", localStorage.getItem(`productsInCart${localStorage.getItem("username")}`));
      this.tempCart = localStorage.getItem(`productsInCart${localStorage.getItem("username")}`)?.split(',')
      this.productsInCart = [];
      this.tempCart.forEach((el: string) => {
        this.productsInCart.push(parseInt(el))
      });
    }
  }
  ChangeProdutsList(index: number) {
    this.productsShow = [];
    this.productsShow = this.productsList[index]
    this.categoryNum = index;
  }
  ChangeProductsInCart(id: any) {
    id = parseInt(id)
    if (localStorage.getItem(`productsInCart${localStorage.getItem("username")}`) == "" || localStorage.getItem(`productsInCart${localStorage.getItem("username")}`) == null) this.productsInCart = [];

    !this.productsInCart.includes(id) ? this.productsInCart.push(id) : this.productsInCart = this.productsInCart.filter((p: any) => p != id);

    localStorage.setItem(`productsInCart${localStorage.getItem("username")}`, this.productsInCart.toString());
    this.productsInCart = this.productsInCart;
    console.log(this.productsInCart);
  }
  toggleLayout() {
    this.layoutGrid = !this.layoutGrid
  }
  openDetails(id: number) {
    if (id == this.modalID) this.details = !this.details;
    this.modalID = id;
  }
  EditProduct(prod: any) {
    this.p.editProduct(prod.id, prod).subscribe({
      next: (data) => { }
    })
  }
}