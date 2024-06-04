
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  products: any;
  users: any;
  user: any;
  usertoken: any;
  login: boolean = false;
  userRole: any;
  username: any;
  constructor(public p: ProductsService, public cartService: CartService, public usersService: UsersService, public router: Router) {

  }
  ngOnInit(): void {
    this.usertoken = localStorage.getItem('usertoken');
    this.userRole = localStorage.getItem('userRole');
    this.username = localStorage.getItem('username');
    console.log("user", this.username);

    this.usersService.getAlluser().subscribe({
      next: data => {
        this.users = data;
        // console.log(this.users)
        this.users.forEach((u: any) => {
          // console.log(u)
          if (u.token == this.usertoken && u.roles == this.userRole) {
            this.user = u;
            this.login = true;
          }
        });

      }
    })
    this.cartService.getProductsIdInCart().subscribe({
      next: (data) => {
        this.products = data;
      }


    });

  }
  goToHomePage() {
    localStorage.setItem("goToPage", "")
  }
  goToProductPage() {
    localStorage.setItem("goToPage", "product")
  }
  logOut() {
    this.login = false;
    localStorage.setItem("usertoken", '');
    this.usertoken = localStorage.getItem('usertoken');
    localStorage.setItem("userRole", '');
    this.userRole = localStorage.getItem('userRole');
    // window.location.reload();
    localStorage.setItem("username", '');
    this.username = localStorage.getItem('username');
    this.router.navigate(['']);
  }
  loginuser() {
    // if( this.usertoken==localStorage.getItem('usertoken')&& this.userRole == localStorage.getItem('userRole'))
    //  {
    //   this.router.navigate(['']);
    //  }

  }
}