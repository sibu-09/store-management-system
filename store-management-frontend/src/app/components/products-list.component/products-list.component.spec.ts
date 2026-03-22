import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  newProduct = { name: '', price: 0, quantity: 0 };
  role: string | null = null;
  currentUser: any = null; // ✅ Store logged-in user info

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.currentUser = this.authService.getUser();
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error loading products:', err)
    });
  }

  addProduct(): void {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.quantity) {
      alert('Please fill all fields!');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        alert('✅ Product added successfully!');
        this.newProduct = { name: '', price: 0, quantity: 0 };
        this.loadProducts();
      },
      error: (err) => console.error('Error adding product:', err)
    });
  }

  buyProduct(product: any): void {
    this.currentUser = this.authService.getUser();
    if (!this.authService.isLoggedIn()) {
      alert('Please login first!');
      this.router.navigate(['/login']);
      return;
    }

    const sale = {
      productName: product.name,
      quantity: 1,
      price: product.price,
      totalAmount: product.price,
      saleDate: new Date(),
      customerName: this.currentUser.name,
      customerEmail: this.currentUser.email,
      customerPhone: this.currentUser.phone || 'N/A'
    };

    this.productService.buyProduct(sale).subscribe({
      next: () => alert(`🛒 Purchase successful for ${product.name}`),
      error: (err) => console.error('Error buying product:', err)
    });
  }
  getProductImage(productName: string): string {
  // Return the expected image path
        return `images/${productName.toLowerCase()}.jpg`;
  }

  onImageError(event: Event): void { 
         const element = event.target as HTMLImageElement;

       // Prevent infinite loop: only set once
           if (element.src.includes('default.jpg')) return;

                    element.src = 'assets/images/default.jpg';
  }
  showAddForm = false; // initially hidden

  toggleAddForm() {
        this.showAddForm = !this.showAddForm;
  }



  // ✅ Admin-only delete
  deleteProduct(id: number) {
    if (this.role !== 'ADMIN') {
      alert('❌ Only admin can delete products!');
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id, this.role).subscribe({
        next: () => {
          alert('🗑️ Product deleted successfully!');
          this.loadProducts();
        },
        error: (err: any) => {
          alert('❌ You are not allowed to delete products!');
          console.error(err);
        }
      });
    }
  }
}