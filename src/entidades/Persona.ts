export type TipoPersona =  "ENCARGADO" |  "VETERINARIO" | "EMPLEADO";


export type Persona = {
    _id?: string;
    nombre: string;
    tipo_persona: TipoPersona;
};

