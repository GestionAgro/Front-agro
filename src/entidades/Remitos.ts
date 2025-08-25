export type EstadoRemito = "EN_ESPERA" | "FACTURADO";

export type Remito = {
     _id?: string;
     numero_remito: number;
     fecha:  Date;
     empresa: string;
     detalle: string;
     recibido_por: string;
     estado:  EstadoRemito;
};


