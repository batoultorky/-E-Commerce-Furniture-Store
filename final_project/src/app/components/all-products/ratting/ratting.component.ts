import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-ratting',
  templateUrl: './ratting.component.html',
  styleUrls: ['./ratting.component.css']
})
export class RattingComponent implements OnInit, OnChanges {
  ratting: boolean[] = [false, false, false, false, false];
  rattingNum: number = 0;
  product: any;
  @Input() showOnly: boolean = false;
  @Input() productRateEditFromDetails: any
  @Input() productId: number = 0;
  @Input() updateRatting: boolean = false;
  @Output() Rate = new EventEmitter();

  constructor(public p: ProductsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ratting = [false, false, false, false, false];
    this.p.getProduct(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        for (let i = 0; i <= this.product.ratting; i++) {
          this.ratting[i] = true;
        }
      }
    });

  }
  ngOnInit(): void {
    this.ratting = [false, false, false, false, false];
    this.p.getProduct(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        for (let i = 0; i <= this.product.ratting; i++) {
          this.ratting[i] = true;
        }
      }
    });
  }
  chooseRate(index: number) {
    if (!this.showOnly) {
      this.ratting = [false, false, false, false, false];
      for (let i = 0; i <= index; i++) {
        this.ratting[i] = true;
      }
      this.product.ratting = index;
      this.Rate.emit(this.product);
    }
  }
}
