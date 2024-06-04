import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  products: any;
  product: any;
  base64: any;
  temp: any;

  id: number = 0;
  constructor(public DynmaicAllData: ProductsService, public ActiveRoute: ActivatedRoute, public router: Router) {

  }
  // pacth data from Api
  ngOnInit(): void {
    this.DynmaicAllData.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      }
    });
    this.id = this.ActiveRoute.snapshot.params['id'];
    if (this.id != 0) {

      this.DynmaicAllData.getProduct(this.id).subscribe({
        next: (data) => {

          this.product = data
          this.getProductName.setValue(this.product.title);
          this.ProductDescripion.setValue(this.product.desc);
          this.ProductCategory.setValue(this.product.category);
          // this.ProductUrlImage.setValue(this.product.image);
          this.ProductPrice.setValue(this.product.price);
          // this.getProductId.setValue(this.product.id);
          this.base64 = this.product.image;
        }


      })
    }

  }
  //   fprm vaildation
  ProductForm = new FormGroup({
    // id: new FormControl(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    category: new FormControl('', [Validators.required]),
    //image: new FormControl('', [Validators.required]),

  });
  // get getProductId() {

  //   return this.ProductForm.controls['id'];
  // }

  get getProductName() {

    return this.ProductForm.controls['title'];
  }
  get ProductDescripion() {

    return this.ProductForm.controls['desc'];
  }
  get ProductPrice() {

    return this.ProductForm.controls['price'];
  }
  get ProductCategory() {

    return this.ProductForm.controls['category'];
  }

  ProductHand(pro: any) {
    if (this.ProductForm.status == 'VALID') {

      if (this.id < 1) {

        this.DynmaicAllData.AddProduct({ ...this.ProductForm.value, image: this.base64 }).subscribe({

          next: (data) => {

            this.router.navigate(['/admin_page']);
          }

        })
      }
      else {
        console.log(this.temp == this.base64);

        this.DynmaicAllData.editProduct(this.id, { ...this.ProductForm.value, image: this.base64 }).subscribe({
          next: (data) => {
            console.log(data)
            this.router.navigate(['/admin_page']);

          }
        })
      }

    }
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        this.base64 = event.target.result as string;
        this.temp = this.base64;
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);

    };


    reader.readAsDataURL(file);
  }
}
