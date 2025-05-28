import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'subtotal', 'actions'];
  
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadCart();
  }
  
  loadCart(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    
    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    });
  }
  
  updateQuantity(itemId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(itemId, quantity);
    }
  }
  
  incrementQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.pizza.id, item.quantity + 1);
  }
  
  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.pizza.id, item.quantity - 1);
    }
  }
  
  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }
  
  clearCart(): void {
    if (confirm('Are you sure you want to empty your cart?')) {
      this.cartService.clearCart();
    }
  }
    checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
