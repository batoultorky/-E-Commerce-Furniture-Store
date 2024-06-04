import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { CategoryProducts } from 'src/app/components/model/category-products';

declare var window: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  formModal: any;
  product: any;

  oldRatting: boolean = false;
  @Input() modalID: number = 0;
  @Input() details: boolean = false;
  @Input() hideRatting: boolean = false;
  constructor(public p: ProductsService) {
    this.product = {
      id: 0,
      title: "",
      price: 0,
      image: "",
      category: "",
      desc: ""
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.oldRatting = !this.oldRatting;
    this.p.getProduct(this.modalID).subscribe({
      next: (data) => {
        this.product = data
      }
    })
    this.formModal.show();

  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
  closeFormModal() {
    // confirm or save something
    this.hideRatting = false;
    this.formModal.hide();
  }

}
