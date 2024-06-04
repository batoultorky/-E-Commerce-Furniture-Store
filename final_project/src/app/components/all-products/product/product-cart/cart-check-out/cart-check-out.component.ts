import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-cart-check-out',
  templateUrl: './cart-check-out.component.html',
  styleUrls: ['./cart-check-out.component.css']
})
export class CartCheckOutComponent {
  proudctall: any;
  @Input() total: number = 0;
  prouctCart: number[] = [2, 15, 20, 19];
  coupon: string = "";
  invalidCoupon: boolean = false;
  @Input() Subtotal: number = 0;
  discountPercentage: number = 20;
  tempCart: any;
  constructor(public erver: ProductsService, public cart: CartService) { }
  ngOnInit(): void {
    localStorage.setItem("coupon", "12345");
    this.prouctCart.forEach(id => {
      this.erver.getProduct(id).subscribe({
        next: (data) => {
          this.proudctall.push(data);
        },
        error: (error) => {
          console.log(error);
        },

      });
    });
  }

  showCouponForm: boolean = false;
  addCouponText: string = "Add a coupon";
  toggleCouponForm() {
    this.showCouponForm = !this.showCouponForm;
    this.addCouponText = this.showCouponForm ? "" : "Click here to Add coupon";

  }
  applyCoupon() {
    if (this.coupon == localStorage.getItem("coupon")) {
      this.invalidCoupon = false;
      const discountAmount = (this.Subtotal * this.discountPercentage) / 100;
      this.total = this.Subtotal - discountAmount;
    } else {
      this.total = this.Subtotal;
      this.invalidCoupon = true;
    }
    this.coupon = "";
  }

}
