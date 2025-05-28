import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem } from '../../models/cart-item.model';
import { OrderRequest } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  customerForm!: FormGroup;
  addressForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.initForms();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      if (this.cartItems.length === 0) {
        this.router.navigate(['/cart']);
      }
    });

    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    });
  }

  initForms(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });

    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      notes: ['']
    });
  }

  submitOrder(): void {
    if (this.customerForm.invalid || this.addressForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const customerData = this.customerForm.value;
    const addressData = this.addressForm.value;
    
    // Format delivery address
    const deliveryAddress = `${addressData.street}, ${addressData.city}, ${addressData.zipCode}`;
    
    const orderData: OrderRequest = this.orderService.prepareOrderRequest(
      this.cartItems,
      customerData.name,
      customerData.email,
      customerData.phone,
      deliveryAddress
    );

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.cartService.clearCart();
        this.snackBar.open('Order submitted successfully! Your order number is: ' + response.orderNumber, 'Close', {
          duration: 5000
        });
        this.router.navigate(['/order-confirmation'], { 
          queryParams: { 
            orderId: response.id,
            orderNumber: response.orderNumber
          }
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        this.snackBar.open('Error submitting order: ' + error.message, 'Close', {
          duration: 5000
        });
      }
    });
  }
}
