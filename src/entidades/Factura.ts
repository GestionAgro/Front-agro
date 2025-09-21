import type { Persona } from "./Persona";

export type EstadoFactura =  "PENDIENTE" |  "IMPUTADA";

export type TipoFactura =  "A" | "B" | "C";


export type Factura = {
    _id?: string;
    numero_remito: number;
    numero_factura: number;
    tipo_factura: TipoFactura;
    empresa: string;
    importe: number;
    recibido_por: Persona;
    estado: EstadoFactura;
};

