import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model'; // Assuming you have a product model file

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // Explicitly type the array as Product[]
  searchQuery: string = '';
  hasSearched: boolean = false;
  sortOption: string = 'New'; 

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllProducts(); // default load
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error) => {
        console.error("Failed to load products:", error);
      }
    });
  }

  searchProducts(): void {
    if (this.searchQuery.trim()) {
      this.hasSearched = true;

      this.productService.searchProducts(this.searchQuery.trim()).subscribe(
        (results: Product[]) => {
          this.products = results;
        },
        (error) => {
          console.error('Search failed:', error);
          this.products = [];
        }
      );
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.hasSearched = false;
    this.sortOption = 'New';
    this.ngOnInit(); // or refetch all products
  }

  sortProducts(): void {
    if (!this.products) {
      return;
    }
  
    switch (this.sortOption) {
      case 'priceAsc':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }

  selectSize(product: Product, size: string): void {
    product.selectedSize = size;
  }

  // Handle adding product to the cart
  addToCart(product: Product): void {
    if (!product.selectedSize) {
      alert("Please select a size");
      return;
    }

    // Fetch existing cart items
    this.cartService.getCartItems().subscribe((cartItems: Product[]) => {
      // Check if the product with the same size already exists in the cart
      const existingItem = cartItems.find(
        (item) => item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        // If the product with the same size exists, update its quantity
        const updatedQuantity = existingItem.quantity + 1;

        this.cartService.updateCartItem(existingItem._id, {
          quantity: updatedQuantity,
        }).subscribe(
          (response) => {
            alert("Product quantity updated in the cart!");
            console.log("Updated cart item:", response);
          },
          (error) => {
            console.error("Failed to update cart item:", error.error.message || error.message);
          }
        );
      } else {
        // If the product with a different size or new product, add it to the cart
        const requestBody = {
          productId: product._id,
          name: product.name,
          price: product.price,
          selectedSize: product.selectedSize as string, // Ensure selectedSize is a string
          quantity: 1,
        };

        this.productService.addToCart(requestBody).subscribe(
          (response) => {
            alert("Product added to cart successfully!");
            console.log("Product added to cart:", response);
          },
          (error) => {
            console.error("Failed to add to cart:", error.error.message || error.message);
          }
        );
      }
    });
  }
}
