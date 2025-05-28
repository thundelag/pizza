import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { OrderResponse } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent implements OnInit {
  orderId: number | null = null;
  orderNumber: string | null = null;
  order: OrderResponse | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['orderId']) {
        this.orderId = Number(params['orderId']);
        this.orderNumber = params['orderNumber'];
        this.loadOrderDetails();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadOrderDetails(): void {
    if (!this.orderId) return;
    
    this.isLoading = true;
    this.orderService.getOrder(this.orderId).subscribe({
      next: (data) => {
        this.order = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading order details:', err);
        this.error = 'Could not load order details. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
