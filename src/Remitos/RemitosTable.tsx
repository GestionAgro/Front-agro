import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/AuthContex";

interface RemitosTableProps {
  rows: any[];
  onDelete?: (id: string) => void;
}

export default function RemitosTable({ rows, onDelete }: RemitosTableProps) {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();


  const columns: GridColDef[] = [
    { field: "numero_remito", headerName: "Número", flex: 1 },
    { field: "fecha", headerName: "Fecha", flex: 1,
      valueGetter: (value, row) =>
        new Date(row.fecha).toLocaleDateString()
    },
    { field: "empresa", headerName: "Empresa", flex: 1 },
    { field: "productos", headerName: "Detalle", flex: 1 ,
     valueGetter: (value, row) =>
    row.productos
      ?.map((p: any) => `${p.nombre_producto}: ${p.cantidad}`)
      .join(", ") || "Sin productos"
},
    {field: "unidades",headerName: "Unidades", flex: 1,
    valueGetter: (value, row) =>
  row.productos
    ?.map((p: any) => p.unidad)
   .join(", ") || "-"
},

    {
      field: "recibido_por",
      headerName: "Recibido por",
      flex: 1,
      valueGetter: (value, row) => row.recibido_por?.nombre || "Sin asignar"
    },
    {
       field: "estado",headerName: "Estado",flex: 1,
      valueGetter: (value, row) => {
      if (!row.estado) return "";
      return row.estado.toLowerCase().replace("_", " ");
     },
     },
   {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 175,
      renderCell: (params) => (
        <div style={{display: "flex",justifyContent: "center",alignItems: "center", gap: "2px",width: "105%",height: "100%"}}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: 50, padding: "2px 2px", fontSize: "0.7rem" }}
            onClick={() => navigate(`/remitos/${params.row._id}`)}
          >
            Ver
          </Button>

          {hasPermission("editar") && (
           <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{ minWidth: 50, padding: "2px 2px", fontSize: "0.7rem" }}
            onClick={() => navigate(`/remitos/${params.row._id}/editar`)}
          >
            Edit
          </Button>
          )}

          {hasPermission("eliminar") && (
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ minWidth: 50, padding: "2px 2px", fontSize: "0.7rem" }}
            onClick={() => onDelete && onDelete(params.row)}
          >
            Borrar
          </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10,100]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
