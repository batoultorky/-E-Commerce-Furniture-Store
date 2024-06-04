import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { CategoryProducts } from '../../model/category-products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product: any;
  @Input() detailsRate: boolean = false;
  @Input() inCart: number[] = [];
  @Input() ID: number = 0;
  @Input() layoutGrid: boolean = true;
  @Output() changeProductsInCart = new EventEmitter();
  @Output() openDetailsForm = new EventEmitter();
  @Output() passProductEditToParent = new EventEmitter();

  constructor(public p: ProductsService) { }
  ngOnInit(): void {
    this.p.getProduct(this.ID).subscribe({
      next: (data) => {
        this.product = data;
      }
    })
  }
  toggleFromToCart(id: number) {
    this.changeProductsInCart.emit(id)
  }
  openDetails(id: number) {
    this.openDetailsForm.emit(id);
  }
  changeRate(p: any) {
    this.passProductEditToParent.emit(p)
  }
}
