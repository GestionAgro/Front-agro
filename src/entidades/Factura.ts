import type { Persona } from "./Persona";

export type EstadoFactura =  "PENDIENTE" |  "IMPUTADA";

export type TipoFactura =  "A" | "B" | "C";

export interface TotalPorMes {
  mes: number;
  totalImporte: number;
}

export interface Factura  {
    _id?: string;
    numero_remito: number;
    numero_factura: number;
    fecha:  Date;
    tipo_factura: TipoFactura;
    empresa: string;
    importe: number;
    recibido_por: Persona;
    estado: EstadoFactura;
};

