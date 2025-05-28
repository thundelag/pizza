import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0;
  
  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.cartService.getCartCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
