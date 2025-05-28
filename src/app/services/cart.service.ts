import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, catchError, tap, switchMap } from 'rxjs';
import { Pizza } from '../models/pizza.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartId: string | null = null;

  constructor(private http: HttpClient) {
    // Load cart from localStorage if available
    this.cartId = localStorage.getItem('cartId');
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCart();
    }
    
    // If we have a cartId, sync with backend
    if (this.cartId) {
      this.syncCartWithBackend();
    }
  }
  
  // Sync cart with backend
  private syncCartWithBackend(): void {
    this.http.get<any>(`${this.apiUrl}/${this.cartId}`).pipe(
      catchError(error => {
        console.error('Error syncing cart with backend:', error);
        // If there's an error (e.g., cart no longer exists), clear the cartId
        if (error.status === 404) {
          this.cartId = null;
          localStorage.removeItem('cartId');
        }
        return of(null);
      })
    ).subscribe(response => {
      if (response && response.items) {
        // Map backend cart items to our model
        this.cartItems = response.items.map((item: any) => ({
          pizza: {
            id: item.pizzaId,
            name: item.pizzaName,
            description: item.description || '',
            price: item.price,
            image: item.imageUrl || 'https://via.placeholder.com/300x200?text=' + item.pizzaName,
            ingredients: item.ingredients || []
          },
          quantity: item.quantity
        }));
        this.updateCart();
      }
    });
  }

  // Get cart items as observable
  getCartItems(): Observable<CartItem[]> {
    if (this.cartId) {
      return this.http.get<any>(`${this.apiUrl}/${this.cartId}`).pipe(
        tap(response => {
          if (response && response.items) {
            // Map backend cart items to our model
            this.cartItems = response.items.map((item: any) => ({
              pizza: {
                id: item.pizzaId,
                name: item.pizzaName,
                description: item.description || '',
                price: item.price,
                image: item.imageUrl || 'https://via.placeholder.com/300x200?text=' + item.pizzaName,
                ingredients: item.ingredients || []
              },
              quantity: item.quantity
            }));
            this.updateCart();
          }
        }),
        catchError(error => {
          console.error('Error fetching cart items:', error);
          return of(this.cartItems);
        }),
        switchMap(() => this.cartItemsSubject.asObservable())
      );
    }
    
    return this.cartItemsSubject.asObservable();
  }

  // Get cart total as observable
  getCartTotal(): Observable<number> {
    return this.cartTotalSubject.asObservable();
  }

  // Get cart count as observable
  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }
  // Add pizza to cart
  addToCart(pizza: Pizza, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.pizza.id === pizza.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ pizza, quantity });
    }

    this.updateCart();
    
    if (this.cartId) {
      // Update existing cart
      this.http.post<any>(`${this.apiUrl}/${this.cartId}/items`, {
        pizzaId: pizza.id,
        quantity: quantity
      }).pipe(
        catchError(error => {
          console.error('Error adding item to cart:', error);
          return of(null);
        })
      ).subscribe();
    } else {
      // Create new cart
      this.http.post<any>(`${this.apiUrl}`, {
        items: [{
          pizzaId: pizza.id,
          quantity: quantity
        }]
      }).pipe(
        catchError(error => {
          console.error('Error creating cart:', error);
          return of(null);
        })
      ).subscribe(response => {
        if (response && response.id) {
          this.cartId = response.id;
          localStorage.setItem('cartId', this.cartId);
        }
      });
    }
  }
  // Remove item from cart
  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.pizza.id !== itemId);
    this.updateCart();
    
    if (this.cartId) {
      this.http.delete(`${this.apiUrl}/${this.cartId}/items/${itemId}`).pipe(
        catchError(error => {
          console.error('Error removing item from cart:', error);
          return of(null);
        })
      ).subscribe();
    }
  }
  // Update item quantity
  updateQuantity(itemId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.pizza.id === itemId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        this.updateCart();
        
        if (this.cartId) {
          this.http.put(`${this.apiUrl}/${this.cartId}/items/${itemId}`, {
            quantity: quantity
          }).pipe(
            catchError(error => {
              console.error('Error updating cart item quantity:', error);
              return of(null);
            })
          ).subscribe();
        }
      }
    }
  }
  // Clear cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
    
    if (this.cartId) {
      this.http.delete(`${this.apiUrl}/${this.cartId}`).pipe(
        catchError(error => {
          console.error('Error clearing cart:', error);
          return of(null);
        })
      ).subscribe(() => {
        // Remove cart ID from local storage
        this.cartId = null;
        localStorage.removeItem('cartId');
      });
    }
  }

  // Private method to update cart state and persist
  private updateCart(): void {
    // Calculate total and count
    const total = this.cartItems.reduce((sum, item) => sum + (item.pizza.price * item.quantity), 0);
    const count = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Update subjects
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartTotalSubject.next(total);
    this.cartCountSubject.next(count);

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
