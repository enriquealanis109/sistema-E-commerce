import { Request, Response } from 'express';
import { Order } from '../interfaces/order.interface';

// Arreglo simulado en memoria para Órdenes
let orders: Order[] = [
  { id: 1, userId: 1, totalAmount: 120500, status: 'pendiente', date: '2026-10-30' },
  { id: 2, userId: 2, totalAmount: 45000, status: 'completada', date: '2026-10-29' }
];

// GET: Obtener todas las órdenes
export const getOrders = (req: Request, res: Response): void => {
  res.json(orders);
};

// GET: Obtener una orden por ID
export const getOrderById = (req: Request, res: Response): any => {
  const id = parseInt(req.params.id as string);
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ mensaje: 'Orden no encontrada' });
  }
  return res.json(order);
};

// POST: Crear una nueva orden
export const createOrder = (req: Request, res: Response): void => {
  const { userId, totalAmount, status } = req.body;
  
  const lastOrder = orders[orders.length - 1];
  const newId = lastOrder ? lastOrder.id + 1 : 1;

  const newOrder: Order = {
    id: newId,
    userId,
    totalAmount,
    status: status || 'pendiente',
    date: (new Date().toISOString().split('T')[0]) as string
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// PUT: Actualizar una orden
export const updateOrder = (req: Request, res: Response): any => {
  const id = parseInt(req.params.id as string);
  const orderIndex = orders.findIndex(o => o.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ mensaje: 'Orden no encontrada' });
  }

  const { userId, totalAmount, status } = req.body;
  const currentOrder = orders[orderIndex]!;

  orders[orderIndex] = {
    ...currentOrder,
    userId: userId ?? currentOrder.userId,
    totalAmount: totalAmount ?? currentOrder.totalAmount,
    status: status ?? currentOrder.status
  };

  return res.json(orders[orderIndex]);
};

// DELETE: Eliminar una orden
export const deleteOrder = (req: Request, res: Response): any => {
  const id = parseInt(req.params.id as string);
  const orderIndex = orders.findIndex(o => o.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ mensaje: 'Orden no encontrada' });
  }

  const deletedOrder = orders.splice(orderIndex, 1);
  return res.json({ mensaje: 'Orden eliminada exitosamente', deletedOrder });
};