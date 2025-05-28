import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Pizza } from '../../models/pizza.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pizza-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './pizza-item.component.html',
  styleUrl: './pizza-item.component.scss'
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza!: Pizza;
  
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (!this.pizza) {
      console.error('Pizza input is required for pizza-item component');
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.pizza);
  }
}
