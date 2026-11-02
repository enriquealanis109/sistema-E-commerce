// esta es la esgtructura de una orden

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: 'pendiente' | 'completada';
  date: string;
}