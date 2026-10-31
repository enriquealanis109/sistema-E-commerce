import { Router } from "express";
import {
  actualizarDetalle,
  crearDetalle,
  eliminarDetalle,
  obtenerDetalles,
  obtenerDetallesPorId,
} from "../controllers/orderItems";

const router: Router = Router();

router.get("/", obtenerDetalles);
router.get("/:id", obtenerDetallesPorId);
router.post("/", crearDetalle);
router.put("/:id", actualizarDetalle);
router.delete("/:id", eliminarDetalle);

export default router;
