import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/AuthContex";

interface ProductosTableProps {
  rows: any[];
  onDelete?: (persona: any) => void;
  onAjustarStock? : (Producto: any) => void;
}

export default function ProductosTable({ rows, onDelete, onAjustarStock}: ProductosTableProps) {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const columns: GridColDef[] = [
    { field: "nombre_producto", headerName: "Nombre", flex: 1 },
    { field: "cantidad_actual", headerName: "Cantidad Actual", flex: 1 },
  ];

    if ( hasPermission("editar") || hasPermission("eliminar") || hasPermission("reducir")) {
  columns.push({
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
            onClick={() => onAjustarStock && onAjustarStock(params.row)}
          >
            reducir
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{ minWidth: 50, padding: "2px 2px", fontSize: "0.7rem" }}
            onClick={() => navigate(`/producto/editar/${params.row._id}`)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ minWidth: 50, padding: "2px 2px", fontSize: "0.7rem" }}
            onClick={() => onDelete && onDelete(params.row)}
          >
            Eliminar
          </Button>
        </div>
      )
  });
}


  return (
    <Paper sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}