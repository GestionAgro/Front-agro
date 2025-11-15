export type TipoPersona =  "ENCARGADO" |  "VETERINARIO" | "EMPLEADO";


export interface Persona {
    _id?: string;
    nombre: string;
    tipo_persona: TipoPersona;
};

