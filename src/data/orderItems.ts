import type { OrderItem } from "../interfaces/orderItem";

export const orderItems: OrderItem[] = [
  { id: 1, orderId: 1, productId: 1, quantity: 2, subtotal: 50 },
  { id: 2, orderId: 1, productId: 2, quantity: 1, subtotal: 30 },
  { id: 3, orderId: 2, productId: 3, quantity: 4, subtotal: 80 },
];
