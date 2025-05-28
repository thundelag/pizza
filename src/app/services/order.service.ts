import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { OrderRequest, OrderResponse } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  // Create a new order
  createOrder(orderData: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.apiUrl, orderData)
      .pipe(
        catchError(error => {
          console.error('Error creating order:', error);
          return throwError(() => new Error('Could not process your order. Please try again.'));
        })
      );
  }

  // Get order by ID
  getOrder(orderId: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${orderId}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching order ${orderId}:`, error);
          return throwError(() => new Error('Could not retrieve your order. Please try again.'));
        })
      );
  }

  // Get orders for a customer by email
  getOrdersByEmail(email: string): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.apiUrl}/customer?email=${email}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching orders for ${email}:`, error);
          return throwError(() => new Error('Could not retrieve your order history. Please try again.'));
        })
      );
  }

  // Map cart items to order request format
  prepareOrderRequest(
    cartItems: CartItem[], 
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    deliveryAddress: string
  ): OrderRequest {
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.pizza.price * item.quantity), 0);
    
    return {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      items: cartItems.map(item => ({
        pizzaId: item.pizza.id,
        quantity: item.quantity
      })),
      totalAmount
    };
  }
}
