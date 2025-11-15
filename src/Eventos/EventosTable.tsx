import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type { Evento } from "../entidades/Evento";

interface EventosTableProps {
  rows: Evento[];
}

export default function EventosTable({ rows }: EventosTableProps) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "entidad_afectada", headerName: "Entidad", flex: 1 },
    { field: "tipo_operacion", headerName: "Operación", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 2 },
    { field: "nombre", headerName: "Persona", flex: 1 },
    {
      field: "fechaYhora",
      headerName: "Fecha y Hora",
      flex: 1,
      renderCell: (params) => {
        const fecha = params.row?.fechaYhora;
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
          onClick={() => navigate(`/eventos/${params.row._id}`)}
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
        pageSizeOptions={[5, 10, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
