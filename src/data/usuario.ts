import type { Usario } from "../interfaces/usuario.interface.ts";
export const usuarios: Usario[] = [
    {
        id: 1,
        name: "Paul Londra",
        email: "pau@gmail.com",
        pasword: "123456q",
        role: "CEO de la tienda",
        createdAt: true
    },
    {
        id: 2,
        name: "Karen Lopex",
        email: "karen@gmail.com",
        pasword: "1234566q",
        role: "Administrador de la tienda",
        createdAt: true
    },
    {
        id: 3,
        name: "Ariane Yarvi",
        email: "ari@gmail.com",
        pasword: "123456q",
        role: "Cajera",
        createdAt: true
    },
    {
        id: 4,
        name: "Swager Quispe",
        email: "sq@gmail.com",
        pasword: "123456q",
        role: "cliente",
        createdAt: true
    }
];

let siguienteId = 5;
export const generarId = (): number => {
    return siguienteId++;
}