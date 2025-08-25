export type Rol = "USUARIO" | "ADMINISTRADOR";

export type Usuario = {
  _id?: string;
  nombre: string;
  email: string;
  rol: Rol;
}

