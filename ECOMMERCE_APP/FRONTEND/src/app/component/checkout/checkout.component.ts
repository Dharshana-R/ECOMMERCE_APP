import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  userDetails = {
    name: '',
    email: '',
    address: '',
    paymentMethod: ''
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Fetch cart items from the cart service
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  onSubmit(): void {
    if (this.userDetails.name && this.userDetails.email && this.userDetails.address && this.userDetails.paymentMethod) {
      alert('Order placed successfully!');
      console.log('Order Details:', this.userDetails, this.cartItems);
      // Clear the cart or redirect to a success page
      this.cartService.clearCart().subscribe(() => {
        this.cartItems = [];
      });
    }
  }
}