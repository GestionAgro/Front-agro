import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";



interface ProductosTableProps {
  rows: any[];
  onDelete?: (persona: any) => void;
  onAjustarStock? : (Producto: any) => void;
}

export default function ProductosTable({ rows, onDelete, onAjustarStock }: ProductosTableProps) {
  const columns: GridColDef[] = [
    { field: "nombre_producto", headerName: "Nombre", flex: 1 },
    { field: "cantidad_actual", headerName: "Cantidad Actual", flex: 1 },

 {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 175,
      renderCell: (params) => (
        <div style={{display: "flex",justifyContent: "center",alignItems: "center",gap: "7px",width: "100%",height: "100%"}}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onAjustarStock && onAjustarStock(params.row)}
          >
            reducir
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDelete && onDelete(params.row)}
          >
            Eliminar
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
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}