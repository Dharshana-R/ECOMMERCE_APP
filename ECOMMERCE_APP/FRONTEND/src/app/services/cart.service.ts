import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:4100/api'; // Base API URL

  constructor(private http: HttpClient) { }

  // // Add an item to the cart
  // addToCart(id: string, name: string, price: number, selectedSize: string, p0: number, cartItem: { productId: string; name: string; price: number; selectedSize: string; quantity: number; }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/addToCart`, cartItem);
  // }


  // Get all cart items
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`); // Matches: GET /api/cart
  }

  // Remove an item from the cart
  removeCartItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${id}`); // Matches: DELETE /api/cart/:id
  }

  // Update the quantity of an item in the cart
  // updateQuantity(cartItemId: string, quantity: number): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/cart/${cartItemId}`, { quantity }); // Matches: PUT /api/cart/:id
  // }

  // updateCartItem(itemId: string, update: { quantity: number }): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/cart/${cartItemId}`, { quantity }); 
  // }

  updateCartItem(itemId: string, update: { quantity: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/${itemId}`, update); // Use itemId instead of cartItemId
  }

  updateQuantity(itemId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/${itemId}`, { quantity });
  }

  // Check if product is already in cart
  checkProductInCart(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/check/${productId}`); // Matches: GET /api/cart/check/:productId
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clearCart");
`);
  }
}
