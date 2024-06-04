import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  activeCategories: boolean[] = [];
  @Output() changeCateg = new EventEmitter();
  constructor() {
    this.activeCategories = [true, false, false, false];
  }
  chooseCategory(num: number) {
    this.activeCategories = [false, false, false, false];
    this.activeCategories[num] = true;
    this.changeCateg.emit(num);
  }
}
