import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


interface PersonasTableProps {
  rows: any[];
  onDelete?: (persona: any) => void;
}

export default function PersonasTable({ rows, onDelete }: PersonasTableProps) {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "tipo_persona", headerName: "Tipo", flex: 1 },

 {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 175,
      renderCell: (params) => (
        <div style={{display: "flex",justifyContent: "center",alignItems: "center",gap: "7px",width: "100%",height: "100%"}}>
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{ fontSize: "0.7rem", padding: "2px 4px" }}
            onClick={() => navigate(`/empleado/editar/${params.row._id}`)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ fontSize: "0.7rem", padding: "2px 4px" }}
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