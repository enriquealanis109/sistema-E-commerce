export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: 'pendiente' | 'completada';
  date: string;
}