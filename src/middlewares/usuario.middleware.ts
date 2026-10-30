import type { Request, Response, NextFunction } from "express";
import { usuarios } from "../data/usuario";

// Identificar al usuario que hace la petición
export const identificarUsuario = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = Number(req.header("x-user-id"));

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(401).json({
            error: "Debes identificarte para realizar esta acción"
        });
    }

    const usuario = usuarios.find(
        (usuario) => usuario.id === id && usuario.createdAt
    );

    if (!usuario) {
        return res.status(401).json({
            error: "Usuario no válido o inactivo"
        });
    }

    // Guardamos el usuario identificado para comprobar sus permisos
    res.locals.usuario = usuario;

    next();
};

// Autorizar según el rol
export const verificarRol = (...rolesPermitidos: string[]) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const usuario = res.locals.usuario;

        if (!usuario || !rolesPermitidos.includes(usuario.role)) {
            return res.status(403).json({
                error: "No tienes permisos para realizar esta acción"
            });
        }

        next();
    };
};