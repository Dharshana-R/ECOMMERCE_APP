export interface Product {
  _id: string;
  name: string;
  price: number;
  sizes: string[];
  selectedSize?: string; // Optional field for the selected size
  quantity: number; // Add this field
}