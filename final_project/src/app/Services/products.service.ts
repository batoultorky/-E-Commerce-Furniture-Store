import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = "http://localhost:5077/api/adminProduct";
  constructor(public http: HttpClient) { }
  getAllProducts() {
    const token = localStorage.getItem('usertoken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // return this.http.get();
    return this.http.get<any>(`${this.baseUrl}/getallproduct`, { headers });
  }
  getProduct(id: number) {
    const token = localStorage.getItem('usertoken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/product/${id}`, { headers });
  }
  editProduct(id: any, product: any) {
    const token = localStorage.getItem('usertoken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log({ ...product, ratting: 0, quantity: 1 });
    return this.http.put<any>(`${this.baseUrl}/${id}`, { ...product, ratting: 0, quantity: 1 }, { headers });
  }
  deleteProduct(id: any) {
    const token = localStorage.getItem('usertoken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }
  AddProduct(product: any) {
    const token = localStorage.getItem('usertoken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.baseUrl, { ...product, ratting: 0, quantity: 1 }, { headers });
  }
}
