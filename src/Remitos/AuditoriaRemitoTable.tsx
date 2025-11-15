import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type { AuditoriaRemito } from "../entidades/AuditoriaRemito";

interface AuditoriasRemitoTableProps {
  rows: AuditoriaRemito[];
}

export default function AuditoriasRemitoTable({ rows }: AuditoriasRemitoTableProps) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "nombre_usuario", headerName: "Usuario", flex: 1 },
    { field: "numero_remito", headerName: "Remito Nº", flex: 1 },
    { field: "campo_modificado", headerName: "Campo Modificado", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 1 },
    {
      field: "fecha_y_hora",
      headerName: "Fecha y Hora",
      flex: 1,
      renderCell: (params) => {
        const fecha = params.row?.fecha_y_hora;
        return fecha ? new Date(fecha).toLocaleString("es-AR") : "";
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ minWidth: 50, padding: "2px 4px", fontSize: "0.7rem" }}
          onClick={() => navigate(`/auditorias-remito/${params.row._id}`)}
        >
          Ver
        </Button>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id!}
        pageSizeOptions={[5, 10, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        checkboxSelection={false}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
