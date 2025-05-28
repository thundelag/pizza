import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza.service';
import { PizzaItemComponent } from '../pizza-item/pizza-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatButtonToggleModule,
    FormsModule,
    PizzaItemComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  pizzas: Pizza[] = [];
  filteredPizzas: Pizza[] = [];
  isLoading = true;
  filterOption: string = 'all';

  constructor(private pizzaService: PizzaService) {}

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.isLoading = true;
    this.pizzaService.getPizzas().subscribe({
      next: (data) => {
        this.pizzas = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching pizzas', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    switch (this.filterOption) {
      case 'vegetarian':
        this.filteredPizzas = this.pizzas.filter(p => p.vegetarian);
        break;
      case 'spicy':
        this.filteredPizzas = this.pizzas.filter(p => p.spicy);
        break;
      case 'popular':
        this.filteredPizzas = this.pizzas.filter(p => p.popular);
        break;
      default:
        this.filteredPizzas = [...this.pizzas];
    }
  }

  onFilterChange(): void {
    this.applyFilter();
  }
}
