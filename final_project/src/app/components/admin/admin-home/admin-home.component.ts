import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  modalID: number = 0;
  details: boolean = false;
  @Output() hideNavBar=new EventEmitter()
  flag: any;
  taggleTrue() {
    this.flag = true;
    console.log(this.flag);
  }

  taggleFale() {
    this.flag = false;
    console.log(this.flag);
  }
  openDetails(id: number) {
    if (id == this.modalID) this.details = !this.details;
    this.modalID = id;
  }

  hiddenNavBar()
{
 this.hideNavBar.emit(false);
}
}
