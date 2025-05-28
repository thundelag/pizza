import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Pizza } from '../models/pizza.model';
import { PIZZAS } from '../data/pizzas.data';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  // URL for the backend API
  private apiUrl = 'http://localhost:8080/api/pizze';
  
  constructor(private http: HttpClient) { }
  
  // Get all pizzas
  getPizzas(): Observable<Pizza[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map(response => this.mapToPizzas(response)),
        catchError(error => {
          console.error('Error fetching pizzas from API:', error);
          // Fallback to mock data if API call fails
          return of(PIZZAS);
        })
      );
  }
  
  // Get pizza by ID
  getPizza(id: number): Observable<Pizza | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => this.mapToPizza(response)),
        catchError(error => {
          console.error(`Error fetching pizza ${id} from API:`, error);
          // Fallback to mock data if API call fails
          const pizza = PIZZAS.find(p => p.id === id);
          return of(pizza);
        })
      );
  }
  
  // Get featured pizzas
  getFeaturedPizzas(): Observable<Pizza[]> {
    return this.getPizzas().pipe(
      map(pizzas => {
        const popular = pizzas.filter(p => p.popular);
        // If there are no popular pizzas marked, return the first 3 pizzas
        return popular.length > 0 ? popular : pizzas.slice(0, 3);
      })
    );
  }
  
  // Helper method to map from backend DTO to frontend model
  private mapToPizzas(pizzasDto: any[]): Pizza[] {
    return pizzasDto.map(dto => this.mapToPizza(dto));
  }
  
  private mapToPizza(dto: any): Pizza {
    return {
      id: dto.id,
      name: dto.nome,
      description: dto.descrizione,
      price: dto.prezzo,
      image: dto.immagineUrl || 'https://via.placeholder.com/300x200?text=' + dto.nome,
      ingredients: dto.categoria ? [dto.categoria] : ['Mixed'],
      // Set these properties based on the category or other criteria if available
      vegetarian: dto.categoria === 'Vegetarian',
      spicy: dto.categoria === 'Spicy',
      popular: true // You might want to determine this another way
    };
  }
}
