import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final_project';
  hideNav:boolean=false
  // title = 'ProductAdd';
toggleNavBar(flag:any )
{
  console.log("helow");
 this.hideNav=flag;
 console.log(this.hideNav);
}
}
