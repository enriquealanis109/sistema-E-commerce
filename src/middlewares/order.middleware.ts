import { Request, Response, NextFunction, RequestHandler } from 'express';

// 1. Logger de peticiones (Imprime método, ruta y fecha/hora)
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();  // pongo la marca de tiempo para saber cuando se hizo la peticion 
  console.log(`[${timestamp}] Método: ${req.method} | Ruta: ${req.originalUrl}`);
  next();
};

// 2. Validador de API Key (Verifica la cabecera 'x-api-key')
export const apiKeyValidator: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
  const apiKey = req.headers['x-api-key'];
  const secretKey = 'yatusabes'; // aqui se pone la clave que quiera

  if (!apiKey || apiKey !== secretKey) {
    return res.status(401).json({ 
      mensaje: 'Acceso no autorizado. Falta o es inválida la cabecera x-api-key' 
    });
  }

  next();
};