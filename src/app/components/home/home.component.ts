import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredPizzas: Pizza[] = [];
  
  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedPizzas();
  }

  loadFeaturedPizzas(): void {
    this.pizzaService.getFeaturedPizzas().subscribe(pizzas => {
      this.featuredPizzas = pizzas;
    });
  }

  addToCart(pizza: Pizza): void {
    this.cartService.addToCart(pizza);
  }
}
