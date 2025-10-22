import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


interface FacturasTableProps {
  rows: any[];
  onDelete?: (factura: any) => void;
  onAsociar?: (factura: any) => void;
}

export default function FacturasTable({ rows, onDelete, onAsociar }: FacturasTableProps) {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "numero_factura", headerName: "Número", flex: 1 },
    { field: "tipo_factura", headerName: "Tipo", flex: 1 },
    { field: "empresa", headerName: "Empresa", flex: 1 },
    { field: "importe", headerName: "Importe", flex: 1 },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      valueGetter: (value, row) => row.estado?.replace("_", " ") || "",
    },
    {
      field: "numero_remito",
      headerName: "Remito",
      flex: 1,
      valueGetter: (value, row) => row.numero_remito ?? "—",
    },
    {
      field: "recibido_por",
      headerName: "Recibido por",
      flex: 1,
      valueGetter: (value, row) => row.recibido_por?.nombre || "Sin asignar",
    },
 {
  field: "acciones",
  headerName: "Acciones",
  sortable: false,
  width: 175,
  renderCell: (params) => {
    const asociado = params.row.estado === "IMPUTADA";

    return (
      <div
        style={{display: "flex", flexWrap: "wrap",justifyContent: "center",alignItems: "center", gap: "2px",width: "105%",height: "100%"}}>
         <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ minWidth: 50, padding: "2px 2px", fontSize: "0.7rem" }}
          onClick={() => navigate(`/facturas/${params.row._id}`)}
        >
          Ver
        </Button>


        {!asociado && (
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ minWidth: 50, padding: "2px 4px", fontSize: "0.7rem" }}
            onClick={() => onAsociar && onAsociar(params.row)}
          >
            Aso
          </Button>
        )}
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ minWidth: 50, padding: "2px 4px", fontSize: "0.7rem" }}
          onClick={() => onDelete && onDelete(params.row)}
        >
          Borrar
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          sx={{ minWidth: 50, padding: "2px 4px", fontSize: "0.7rem" }}
          onClick={() => navigate(`/facturas/${params.row._id}/editar`)}
        >
          Edit
        </Button>
      </div>
    );
  },
 },
 ]
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
