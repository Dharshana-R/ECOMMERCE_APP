import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';  // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:4100/api/products';  // Replace with your actual API URL
  constructor(private http: HttpClient) { }  // Removed ProductListComponent

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Add the addToCart method here
  addToCart(requestBody: { productId: string; name: string; price: number; selectedSize: string; quantity: number }): Observable<any> {
    const url = 'http://localhost:4100/api/addtoCart';
    return this.http.post(url, requestBody);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    const url = 'http://localhost:4100/api/search/products';
    return this.http.get<Product[]>(`${url}?name=${query}`);
  }

}