import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:4100/api'; // Backend API endpoint

  constructor(private http: HttpClient) {}

  // Place an order
  placeOrder(orderDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createOrder`, orderDetails);

  }
}