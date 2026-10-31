import type { Request, Response } from "express";
import { orderItems } from "../data/orderItems";
import type { OrderItem } from "../interfaces/orderItem";

let siguienteId = orderItems.length + 1;

/* END POINTS */

/* GET Obtener detalles de la orden */
export function obtenerDetalles(req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    data: orderItems,
  });
}

/* Obtener detalles de la orden por ID */
export function obtenerDetallesPorId(req: Request, res: Response) {
  const id = Number(req.params.id);
  const detalle = orderItems.find((item) => item.id === id);

  if (!detalle) {
    return res.status(404).json({
      ok: false,
      mensaje: `El detalle con el id ${id} no existe`,
    });
  }
  res.status(200).json({
    ok: true,
    data: detalle,
  });
}

/* Crear detalle */
export function crearDetalle(req: Request, res: Response) {
  if (!req.body) {
    return res.status(400).json({
      ok: false,
      mensaje: "El body es obligatorio",
    });
  }
  const { orderId, productId, quantity, subtotal }: OrderItem = req.body;
  if (!orderId || !productId || !quantity || !subtotal) {
    return res.status(400).json({
      ok: false,
      mensaje: "orderId, productId, quantity y subtotal son obligatorios",
    });
  }

  const nuevoDetalle: OrderItem = {
    id: siguienteId++,
    orderId,
    productId,
    quantity,
    subtotal,
  };

  orderItems.push(nuevoDetalle);
  res.status(201).json({
    ok: true,
    data: nuevoDetalle,
  });
}

/* Actualizar detalle */
export function actualizarDetalle(req: Request, res: Response) {
  const id = Number(req.params.id);
  const detalle = orderItems.find((item) => item.id === id);

  if (!detalle) {
    return res.status(404).json({
      ok: false,
      mensaje: `El detalle con el id ${id} no existe`,
    });
  }

  if (!req.body) {
    return res.status(400).json({
      ok: false,
      mensaje: "El body es obligatorio",
    });
  }

  const { orderId, productId, quantity, subtotal }: OrderItem = req.body;

  if (!orderId || !productId || !quantity || !subtotal) {
    return res.status(400).json({
      ok: false,
      mensaje: "orderId, productId, quantity y subtotal son obligatorios",
    });
  }

  detalle.orderId = orderId;
  detalle.productId = productId;
  detalle.quantity = quantity;
  detalle.subtotal = subtotal;

  res.status(200).json({
    ok: true,
    data: detalle,
  });
}

/* Eliminar detalle */
export function eliminarDetalle(req: Request, res: Response) {
  const id = Number(req.params.id);
  const indice = orderItems.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `El detalle con el id ${id} no existe`,
    });
  }

  const [eliminado] = orderItems.splice(indice, 1);

  res.status(200).json({
    ok: true,
    data: eliminado,
  });
}
