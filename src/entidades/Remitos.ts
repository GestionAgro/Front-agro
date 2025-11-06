import type { Persona } from "./Persona";
import type { Producto } from "./Producto";

export type EstadoRemito = "EN_ESPERA" | "FACTURADO";

export type ProductoDetalleRemito = {
  id_producto?: string | Producto;
  nombre_producto: string;
  cantidad: number;
};


export type Remito = {
     _id?: string;
     numero_remito: number;
     fecha:  Date;
     empresa: string;
     productos: ProductoDetalleRemito[];
     recibido_por: string | Persona;
     estado:  EstadoRemito;
};


