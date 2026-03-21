import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sale {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  saleDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private baseUrl = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) {}

  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.baseUrl);
  }

  deleteSale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateSale(id: number, sale: Sale): Observable<Sale> {
    const role = localStorage.getItem('role') || 'USER';
    return this.http.put<Sale>(`${this.baseUrl}/${id}`, sale, {
      headers: { Role: role }
    });
  }
}
