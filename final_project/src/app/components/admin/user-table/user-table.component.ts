import { Component } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  users:any;
  constructor( public DynmaicAllData:UsersService)
  {

    

  }
  
    ngOnInit(): void {
      this.DynmaicAllData.getAlluser().subscribe({
        next: (data) => {
          console.log(data);
          this.users = data;
        },
        error: (error) => {
          console.error('An error occurred:', error);
          // Handle the error as needed, such as displaying an error message to the user
        }
      });
    }

    DeleteUser(id:any){
      this.DynmaicAllData.Deleteuser(id).subscribe({
        next:(data)=>{
          this.users=this.users.filter((product : any)=>product.id !=id);

        }
        
      })
    }
}
