 import type { Response, Request } from "express";
import { Categoria, ropaMujer} from "../interfaces/categorias";

export function todaLaRopa(req: Request, res: Response) {
  /* 
    #swagger.tags = ['ropaMujer']
    #swagger.description = 'Endpoint para obtener toda la ropa registrada'
    #swagger.security = [{
    }]
  */
  res.status(200).json({
    ok: true,
    mensaje: "Lista de toda la ropa disponible",
    data: ropaMujer.filter((rm: Categoria) => rm.disponible === true),
  });
}

export function traerUnaPrenda(req: Request, res: Response) {
  /* #swagger.tags = ['ropaMujer'] 
    #swagger.description = 'Endpoint para una prenda especifica por su ID'
    #swagger.parameters['id'] = {
      description: 'ID de postgresql o identificador único de la prenda',
      type: 'string',
      required: true,
      example: '12438'
    }
      #swagger.security = [{
    }]
  */
  let idBuscarPrenda = Number(req.params.id);
  let prendaEncontrada = ropaMujer.find(
    (ropa: Categoria) => ropa.id === idBuscarPrenda,
  );

  if (!prendaEncontrada) {
    return res.status(404).json({
      ok: false,
      mensaje: `la prenda con el id ${idBuscarPrenda} no existe`,
    });
  }
  res.status(200).json({
    ok: true,
    mensaje: "tu prenda fue encontrada",
    data: prendaEncontrada,
  });
}

export function crearPrendaNueva(req: Request, res: Response) {
  /* #swagger.tags = ['ropaMujer'] 
    #swagger.description = 'Endpoint para crear una prenda nueva'
    #swagger.parameters['nuevaPrenda'] = {
      in: 'body',
      description: 'Información de la prenda a crear',
      required: true,
      schema: {
        nombre: "string",
        descripcion: "string",
        disponible: boolean
        
      }
    }
  */
  const { nombre, descripcion, disponible } = req.body;
  if (!nombre|| !descripcion || !disponible) {
    return res.status(400).json({
      ok: false,
      mensaje: "FALTAN CAMPOS OBLIGATORIOS!",
    });
  }
  let nuevaPrenda: Categoria = {
    id: ropaMujer.length + 1,
    nombre,
    descripcion,
    disponible
  };
  ropaMujer.push(nuevaPrenda);
  res.status(201).json({
    ok: true,
    mensaje: "Prenda creada con exito",
    data: nuevaPrenda,
  });
}

export function actualizarPrenda(req: Request, res: Response) {
  /* #swagger.tags = ['ropaMujer'] 
  #swagger.description = 'Endpoint para actualizar el registro de prenda existente'

  #swagger.security = [{

    }]*/
  let idBuscarPrenda = Number(req.params.id);
  let indiceEncontrado= ropaMujer.findIndex(
    (ropa: Categoria) => ropa.id === idBuscarPrenda,
  );
  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "la prenda que deseas actualizar, NO EXISTE!",
    });
  }
  const { nombre, descripcion, disponible} = req.body;
  if (!nombre || !descripcion || !disponible ) {
    return res.status(400).json({
      ok: false,
      mensaje: "FALTAN CAMPOS OBLIGATORIOS",
    });
  }
  ropaMujer[indiceEncontrado] = {
    id: idBuscarPrenda,
    nombre,
    descripcion,
    disponible
  };
  res.status(214).json({
    ok: true,
    mensaje: "prenda actualizada con exito",
    data: ropaMujer[indiceEncontrado],
  });
}

export function eliminarPrendaHard(req: Request, res: Response) {
  /* #swagger.tags = ['ropaMuejer'] 
  #swagger.description = 'Endpoint para eliminar de manera fisica un registro de una prenda por su id'
  #swagger.security = [{
    
    }]
  */
  let idBuscarPrenda = Number(req.params.id);
  let indiceEncontrado = ropaMujer.findIndex(
    (ropa: Categoria) => ropa.id === idBuscarPrenda,
  );
  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "la prenda que deseas actualizar, NO EXISTE",
    });
  }

  ropaMujer.splice(indiceEncontrado, 1);

  res.status(200).json({
    ok: true,
    mensaje: "eliminacion fisica exitosa",
  });
}
export function eliminarPrendaSoft(req: Request, res: Response) {
  /* #swagger.tags = ['ropaMujer'] 
  #swagger.description = 'Endpoint para eliminar de manera logica (soft delete) un registro de una prenda'
  #swagger.security = [{
      
    }]*/
  let idBuscarPrenda = Number(req.params.id);
  let indiceEncontrado = ropaMujer.findIndex(
    (ropa: Categoria) => ropa.id === idBuscarPrenda,
  );
  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "la prenda que deseas actualizar, NO EXISTE",
    });
  }
  const prenda = ropaMujer[indiceEncontrado];
  if (!prenda) {
    return res.status(404).json({
      ok: false,
      mensaje: "prenda no encontrado",
    });
  }
  prenda.disponible = false;
  return res.status(200).json({
    ok: true,
    mensaje: "Prenda eliminada correctamente",
    ropa: prenda,
  });
}
