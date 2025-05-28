import { CartItem } from './cart-item.model';

export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: {
    pizzaId: number;
    quantity: number;
  }[];
  totalAmount: number;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  totalAmount: number;
  orderDate: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  items: {
    id: number;
    pizzaId: number;
    pizzaName: string;
    quantity: number;
    price: number;
  }[];
}
