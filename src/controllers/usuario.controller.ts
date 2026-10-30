import type { Request, Response } from "express";
import { usuarios, generarId } from "../data/usuario";
import type { Usario } from "../interfaces/usuario.interface";

//get listar usuarios
export const listarUsuarios = (req: Request, res: Response) => {
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Listar Usuarios activos'
       #swagger.description = 'Obtiene la lista de todos los Usuarios activos.'
       #swagger.responses[200] = {
           description: 'Lista de Usuarios obtenida exitosamente'
       }
    */
    res.json(usuarios.filter(usuario => usuario.createdAt));
};
//get por id
export const buscarUsario = (req: Request, res: Response) => {
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Buscar Usuario por ID'
       #swagger.description = 'Busca un Usuario activo utilizando su ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID del Usuario',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Usuario encontrado exitosamente'
       }
       #swagger.responses[400] = {
           description: 'El ID debe ser un número entero positivo'
       }
       #swagger.responses[404] = {
           description: 'Usuario no encontrado'
       }
    */
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El ID debe ser un número entero positivo"
        });
    }
    const usuario = usuarios.find(usuario => usuario.id === id && usuario.createdAt);
    if (!usuario) {
        return res.status(404).json({
            error: "Usuario no encontrado"
        });
    }
    res.json(usuario);
};
//post crear usuario
export const crearUsuario = (req: Request, res: Response) => {
    /*
 #swagger.summary = 'Registrar un nuevo usuario'
 #swagger.parameters['x-user-id'] = {
     in: 'header',
     description: 'ID del usuario que realiza la petición',
     required: true,
     type: 'integer'
 }
 #swagger.parameters['body'] = {
     in: 'body',
     description: 'Datos del nuevo usuario',
     required: true,
     schema: {
         $name: 'nombre',
          $email: 'example@gmail.com',
          $pasword: 'ejemplo123',
          $role: 'ejemplo'
     }
 }
 */
    const { name, email, pasword, role, createdAt } = req.body;
    const nuevoUsuario: Usario = {
        id: generarId(),
        name,
        email,
        pasword,
        role,
        createdAt: true
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
};

//put: actualizar curso
export const actualizarUsuario = (req: Request, res: Response) => {
    /*
  #swagger.summary = 'Actualizar un usuario'
  #swagger.parameters['x-user-id'] = {
      in: 'header',
      description: 'ID del usuario que realiza la petición',
      required: true,
      type: 'integer'
  }
  #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del usuario que deseas actualizar',
      required: true,
      type: 'integer'
  }
  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos actualizados del usuario',
      required: true,
      schema: {
          $name: 'nombre',
          $email: 'example@gmail.com',
          $pasword: 'ejemplo123',
          $role: 'ejemplo'
      }
  }
  */
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El ID debe ser un número entero positivo"
        });
    }
    const usuario = usuarios.find(usuario => usuario.id === id && usuario.createdAt);
    if (!usuario) {
        return res.status(404).json({
            error: "Usuario no encontrado"
        });
    }
    const { name, email, pasword, role, createdAt } = req.body;
    usuario.name = name;
    usuario.email = email;
    usuario.pasword = pasword;
    usuario.role = role;
    usuario.createdAt = createdAt;

    res.json(usuario);
}
// delete( inactivar a false)
export const desactivarUsuario = (req: Request, res: Response) => {
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Desactivar Usuario'
       #swagger.description = 'Desactiva un Usuario sin eliminarlo definitivamente.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID del Usuario',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Usuario desactivado correctamente'
       }
       #swagger.responses[404] = {
           description: 'Usuario activo no encontrado'
       }
    */
    const id = Number(req.params.id);
    const usuario = usuarios.find(usuario => usuario.id === id && usuario.createdAt);
    if (!usuario) {
        return res.status(404).json({
            error: "Usuario no encontrado"
        });
    }
    usuario.createdAt = false;
    res.json({
        mensaje: "Usuario desactivado correctamente",
        usuario
    });
};

//delete_ eliminar el usuario definitivo
export const eliminarUsuario = (req: Request, res: Response) => {
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Eliminar Usuario definitivamente'
       #swagger.description = 'Elimina permanentemente un Usuario del arreglo.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID del Usuario',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Usuario eliminado definitivamente'
       }
       #swagger.responses[404] = {
           description: 'Usuario no encontrado'
       }
    */
    const id = Number(req.params.id);
    const indice = usuarios.findIndex(usuario => usuario.id === id);
    if (indice === -1) {
        return res.status(404).json({
            error: "Usuario no encontrado"
        });
    }
    const eliminado = usuarios.splice(indice, 1);

    res.json({
        mensaje: "Usuario eliminado definitivamente",
        curso: eliminado[0]
    });

}
