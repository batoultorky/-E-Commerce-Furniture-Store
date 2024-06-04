import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  baseUrl: string = 'http://localhost:5077/api/Auth';
  constructor(public http: HttpClient) { }

  getAlluser() {
    const token=localStorage.getItem('usertoken');
    const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
    // return this.http.get('http://localhost:5077/api/adminUser');
    return this.http.get<any>('http://localhost:5077/api/adminUser', { headers });
  }
  getlogin(User: any){
     return this.http.post(`${this.baseUrl}/login`,User)
  }
  AddUser(User: any) {
    console.log(User);
    return this.http.post(`${this.baseUrl}/register`, User)
  }
  AddAdmin(Admin:any){
    const token=localStorage.getItem('usertoken');
    const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
   
    return this.http.post<any>('http://localhost:5077/api/Auth/addadmin', Admin , { headers });
  }
  // {
  //   "fullName": "string",
  //   "username": "string",
  //   "password": "string",
  //   "confirmPassword": "string",
  //   "email": "user@example.com"
  // }
  Deleteuser(id: any) {
    const token = localStorage.getItem('usertoken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`http://localhost:5077/api/adminUser/${id}`, { headers })
  }
}
