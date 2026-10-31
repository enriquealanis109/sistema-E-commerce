 import { Router } from "express";
import {
    todaLaRopa,
    traerUnaPrenda,
    crearPrendaNueva,
    actualizarPrenda,
    eliminarPrendaHard,
    eliminarPrendaSoft
  
} from "../controllers/categoria";
const router = Router();

router.get("/api/Categoria", todaLaRopa);

router.get("/api/Categoria/:id", traerUnaPrenda);

router.post("/api/Categoria", crearPrendaNueva);

router.put("/api/Categoria/:id", actualizarPrenda);

router.delete("/api/Categoria/:id", eliminarPrendaHard);

router.delete("/api/Categoria/soft/:id", eliminarPrendaSoft);

export default router;