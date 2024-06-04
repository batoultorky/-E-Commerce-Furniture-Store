import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-products-title',
  templateUrl: './products-title.component.html',
  styleUrls: ['./products-title.component.css']
})
export class ProductsTitleComponent implements OnInit, OnChanges {
  layoutGrid: boolean = true;
  @Input() productCategory: string = "";
  @Input() count: any;
  @Output() changeLayout = new EventEmitter();
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("count", this.count);

  }
  toggleLayout() {
    this.layoutGrid = !this.layoutGrid;
    this.changeLayout.emit();
  }


}
