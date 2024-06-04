import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  emptyCart: boolean = false;
  products: any;
  quantity: number = 1;
  total: number = 0;
  prouctCart: number[] = [];
  tempCart: any;
  // prouctCart:number[]=[];
  productData: any = [];
  prod: any;
  proudctall: any;
  temproduct: any;
  constructor(public erver: ProductsService, public cart: CartService) { }
  ngOnInit(): void {
    this.erver.getAllProducts().subscribe({
      next: (data) => {
        this.proudctall = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    // this.cart.getProductsIdInCart().subscribe({
    //   next: data => {
    //     this.tempCart = data;

    //     this.prouctCart = this.tempCart[0].productsID;
    //     if (this.prouctCart.length == 0) this.emptyCart = true;
    //     else {
    //       this.prouctCart.forEach((id) => {

    //         this.erver.getProduct(id).subscribe({
    //           next: (data) => {
    //             this.productData.push(data);
    //             this.temproduct = data;
    //             this.total += this.temproduct.price * this.temproduct.quantity;

    //           },
    //           error: (error) => {
    //             console.log(error);
    //           },
    //         });
    //       });
    //     }
    //   }
    // })
    if (localStorage.getItem(`productsInCart${localStorage.getItem("username")}`) == null) {
      this.prouctCart = [];
      this.emptyCart = true;
    }
    else {
      this.tempCart = localStorage.getItem(`productsInCart${localStorage.getItem("username")}`)?.split(',')
      this.prouctCart = [];
      this.tempCart.forEach((el: string) => {
        this.prouctCart.push(parseInt(el))
      });
      this.prouctCart.forEach((id) => {
        this.erver.getProduct(id).subscribe({
          next: (data) => {
            this.productData.push(data);
            this.temproduct = data;
            this.total += this.temproduct.price * this.temproduct.quantity;
          },
          error: (error) => {
            console.log(error);
          },
        });
      });
    }
  }


  incrementQuantity(product: any): void {
    product.quantity++;
  }

  decrementQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  showTrashIcon(show: boolean): void {
    const elements = document.querySelectorAll('.bg-image');
    elements.forEach((element) => {
      if (show) {
        element.classList.add('show-trash');
      } else {
        element.classList.remove('show-trash');
      }
    });
  }
  //remove total from databse
  deleteProductHandelr(id: any): void {
    this.productData = this.productData.filter(
      (product: any) => product.id != id
    );
  }
  // updatacheck() {
  //   this.tempCart[0].productsID = [];
  //   this.productData.forEach((p: any) => {
  //     this.tempCart[0].productsID.push(p.id);
  //   })
  //   this.cart.editcartProducts("1", this.tempCart[0]).subscribe({
  //     next: data => console.log(data)
  //   })
  //   this.productData.forEach((p: any) => {
  //     this.erver.editProduct(p.id, p).subscribe({
  //       next: data => { }
  //     })
  //   });
  //   this.total = 0;
  //   this.productData.forEach((prod: any) => {
  //     this.total += (prod.price * prod.quantity);
  //   });
  //   if (this.productData.length == 0) this.emptyCart = true;
  //   this.productData.forEach((p: any) => {
  //     this.proudctall.forEach((pro: any) => {
  //       if (pro.id != p.id) {
  //         pro.quantity = 1;
  //         this.erver.editProduct(pro.id, pro).subscribe({
  //           next: data => { }
  //         })
  //       }

  //     });
  //   });


  // }
  updatacheck() {
    this.tempCart = [];
    this.productData.forEach((p: any) => {
      this.tempCart.push(p.id);
    })
    //  if(this.tempCart.length==1&&this.tempCart[0]=="NaN") 
    localStorage.setItem(`productsInCart${localStorage.getItem("username")}`, this.tempCart.toString());
    console.log(this.tempCart.toString())
    this.productData.forEach((p: any) => {
      this.erver.editProduct(p.id, p).subscribe({
        next: data => { }
      })
    });
    this.total = 0;
    this.productData.forEach((prod: any) => {
      this.total += (prod.price * prod.quantity);
    });
    if (this.productData.length == 0) this.emptyCart = true;
    this.productData.forEach((p: any) => {
      this.proudctall.forEach((pro: any) => {
        if (pro.id != p.id) {
          pro.quantity = 1;
          this.erver.editProduct(pro.id, pro).subscribe({
            next: data => { }
          })
        }

      });
    });


  }
}
