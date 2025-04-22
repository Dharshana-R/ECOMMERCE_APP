import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent implements OnInit {
  products = [];  // Your list of products
  //cart = [];      // Your cart data
  cartItems: any[] = [];  // To store the list of cart items
  totalAmount: number = 0; // Declare the totalAmount property

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.calculateTotal(); // Calculate total after items are loaded
      },
      error: (err) => console.error('Failed to fetch cart items', err)
    });
  }
  updateQuantity(id: string, quantity: number): void {
    if (quantity < 1) return; // Prevent quantity from going below 1

    this.cartService.updateQuantity(id, quantity).subscribe({
      next: (response) => {
        console.log('Quantity updated successfully:', response);
        this.getCartItems(); // Refresh the cart
      },
      error: (err) => console.error('Failed to update quantity', err)
    });
  }
  calculateTotal(): number {
    const total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log('Total Amount:', total); // Debugging
    return total;
  }
  // calculateTotal(): void {
  //   this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // }
  
  removeItem(itemId: string): void {
    this.cartService.removeCartItem(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item._id !== itemId);
        this.calculateTotal(); // Recalculate total after removing an item
      },
      error: (err) => console.error('Failed to remove item', err)
    });
  }

  // updateQuantity(id: string, quantity: number) {
  //   this.cartService.updateQuantity(id, quantity).subscribe(() => {
  //     this.getCartItems();  // Refresh the cart
  //   });
  // }
  

 
}
