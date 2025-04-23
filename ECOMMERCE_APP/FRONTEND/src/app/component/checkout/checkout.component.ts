import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';

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
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: ''
  };

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

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
      const orderDetails = {
        ...this.userDetails,
        cartItems: this.cartItems,
        totalAmount: this.calculateTotal()
      };

      // Use CheckoutService to send order details to the backend
      this.checkoutService.placeOrder(orderDetails).subscribe({
        next: (response) => {
          alert('Order placed successfully!');
          console.log('Order Response:', response);

          // Clear the cart
          this.cartService.clearCart().subscribe(() => {
            this.cartItems = [];
            this.router.navigate(['/success'], { state: { order: orderDetails } });  // Redirect to a success page
          });
        },
        error: (err) => {
          console.error('Failed to place order:', err);
          alert('Failed to place order. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}