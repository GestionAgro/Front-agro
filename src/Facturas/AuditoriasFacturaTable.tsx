import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type { AuditoriaFactura } from "../entidades/AuditoriaFactura";

interface AuditoriasTableProps {
  rows: AuditoriaFactura[];
}

export default function AuditoriasFacturaTable({ rows }: AuditoriasTableProps) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id_usuario", headerName: "Usuario", flex: 1 },
    { field: "campo_modificado", headerName: "Campo Modificado", flex: 1 },
    {
      field: "valor_anterior",
      headerName: "Valor Anterior",
      flex: 1,
      renderCell: (params) => {
        const valor = params.row?.valor_anterior;
        if (!valor) return "";
        try {
          return typeof valor === "object"
            ? JSON.stringify(valor, null, 2)
            : valor;
        } catch {
          return String(valor);
        }
      },
    },
    {
      field: "valor_nuevo",
      headerName: "Valor Nuevo",
      flex: 1,
      renderCell: (params) => {
        const valor = params.row?.valor_nuevo;
        if (!valor) return "";
        try {
          return typeof valor === "object"
            ? JSON.stringify(valor, null, 2)
            : valor;
        } catch {
          return String(valor);
        }
      },
    },
    { field: "descripcion", headerName: "Descripción", flex: 1 },
    {
      field: "fecha_y_hora",
      headerName: "Fecha y Hora",
      flex: 1,
      renderCell: (params) => {
        const fecha = params.row?.fecha_y_hora;
        if (!fecha) return "";
        try {
          return new Date(fecha).toLocaleString("es-AR");
        } catch {
          return fecha;
        }
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: 50, padding: "2px 4px", fontSize: "0.7rem" }}
            onClick={() => navigate(`/auditorias-factura/${params.row._id}`)}
          >
            Ver
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%" }}>
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
