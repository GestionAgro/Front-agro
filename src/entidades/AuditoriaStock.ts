export interface AuditoriaStock{
  _id?: string;
  id_stock: string;
  id_usuario: string;
  campo_modificado: string;
  valor_anterior: string;
  valor_nuevo: string;
  fecha_y_hora?: Date;
  descripcion: string;
  nombre_usuario?: string

}
