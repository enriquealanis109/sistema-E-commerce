 import { Request, Response, NextFunction } from "express";

export const loggerDePeticiones = (req: Request, res: Response, next: NextFunction) => {
    const metodo = req.method;                      
    const ruta = req.originalUrl;                   
    const timestamp = new Date().toLocaleString();   

    console.log(`[${timestamp}] MÉTODOS: ${metodo} | RUTA: ${ruta}`);
    
    next(); 
};



export const validarApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKeyCliente = req.headers['x-api-key'];
    const API_KEY_CORRECTA = process.env.API_KEY_SECRETA; 

    if (!apiKeyCliente || apiKeyCliente !== API_KEY_CORRECTA) {
        return res.status(401).json({
            ok: false,
            mensaje: "Acceso denegado. Cabecera 'x-api-key' inválida o ausente."
        });
    }

    next(); 
};