import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
  standalone: false
})
export class SuccesspageComponent implements OnInit {
  orderDetails: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.orderDetails = nav?.extras?.state?.['order'];
  }

  ngOnInit(): void {
    if (!this.orderDetails) {
      // If orderDetails not found, redirect back to home or checkout
      this.router.navigate(['/']);
    }
  }
}
