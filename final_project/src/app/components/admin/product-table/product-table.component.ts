import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  products: any;
  @Output() openDetailsForm = new EventEmitter();
  constructor(public DynimacData: ProductsService) {



  }

  ngOnInit(): void {
    this.DynimacData.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },
      error: (error) => {
        console.error('An error occurred:', error);
       
      }
    });





  }
  openDetails(id: number) {
    this.openDetailsForm.emit(id);
  }
  // delete product
  DeleteProduct(id: any) {
    console.log("IDID:", id);

    this.DynimacData.deleteProduct(id).subscribe({
      next: (data) => {
        this.products = this.products.filter((product: any) => product.id != id);
      }
    })
  }

}
