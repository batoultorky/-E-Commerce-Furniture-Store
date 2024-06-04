import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = "http://localhost:3000/Cart";
  constructor(public http: HttpClient) { }
  getProductsIdInCart() {
    return this.http.get(this.baseUrl);
  }
  editcartProducts(id: any, cart: any) {
    return this.http.put(`${this.baseUrl}/${id}`, cart);
  }
}
