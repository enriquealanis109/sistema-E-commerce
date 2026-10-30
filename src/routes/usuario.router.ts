import { Router } from "express";
import {
    listarUsuarios,
    buscarUsario,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    eliminarUsuario
} from "../controllers/usuario.controller";

import {
    identificarUsuario,
    verificarRol
} from "../middlewares/usuario.middleware";

const router = Router();

// GET: listar usuarios
router.get(
    "/",
    identificarUsuario,
    verificarRol("CEO de la tienda", "Administrador de la tienda"),
    listarUsuarios
);

// GET: buscar usuario por ID
router.get(
    "/:id",
    identificarUsuario,
    verificarRol("CEO de la tienda", "Administrador de la tienda"),
    buscarUsario
);

// POST: crear usuario
router.post(
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Crear Usuario'
       #swagger.description = 'Registra un nuevo Usuario.'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Datos del nuevo Usuario',
           required: true,
           schema: {
               name: 'hola',
               email: 'ad@gmial.com',
               pasword: xxxx
               crediAt: true
           }
       }
       #swagger.responses[201] = {
           description: 'Usuario creado exitosamente'
       }
       #swagger.responses[400] = {
           description: 'Datos del Usuario inválidos'
       }
    */
    "/",
    identificarUsuario,
    verificarRol("CEO de la tienda", "Administrador de la tienda"),
    crearUsuario
);

// PUT: actualizar usuario
router.put(
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Actualizar Usuario'
       #swagger.description = 'Actualiza los datos de un Usuario activo.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID del Usuario',
           required: true,
           type: 'integer'
       }
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Datos actualizados del Usuario',
           required: true,
           schema: {
               name: 'hola',
               email: 'ad@gmial.com',
               pasword: xxxx
               crediAt: true
           }
       }
       #swagger.responses[200] = {
           description: 'Usuario actualizado exitosamente'
       }
       #swagger.responses[400] = {
           description: 'El ID debe ser un número entero positivo'
       }
       #swagger.responses[404] = {
           description: 'Usuario no encontrado'
       }
    */
    "/:id",
    identificarUsuario,
    verificarRol("CEO de la tienda", "Administrador de la tienda"),
    actualizarUsuario
);

// DELETE: desactivar usuario
router.delete(
    "/soft/:id",
    identificarUsuario,
    verificarRol("CEO de la tienda", "Administrador de la tienda"),
    desactivarUsuario
);

// DELETE: eliminar definitivamente
router.delete(
    "/hard/:id",
    identificarUsuario,
    verificarRol("CEO de la tienda"),
    eliminarUsuario
);

export default router;
