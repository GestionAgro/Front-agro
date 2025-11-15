export type Rol = "USUARIO" | "ADMINISTRADOR";

export interface Usuario {
  _id?: string;
  nombre: string;
  email: string;
  rol: Rol;
  firebaseUid: string;
}

