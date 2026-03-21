import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productUrl = 'http://localhost:8080/api/products';
  private salesUrl = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) {}

  // 🔹 Get all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl);
  }

  // 🔹 Add product (Admin only)
  addProduct(product: any): Observable<any> {
    return this.http.post(this.productUrl, product);
  }

  // 🔹 Record sale (User)
  buyProduct(sale: any): Observable<any> {
    return this.http.post(this.salesUrl, sale);
  }

  // ✅ Delete product (Admin only)
  deleteProduct(id: number, role: string | null) {
    return this.http.delete(`${this.productUrl}/${id}`, {
      headers: { Role: role || 'USER' }
    });
  }
}
