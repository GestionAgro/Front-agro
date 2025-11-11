import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { Usuario } from "../entidades/Usuario";

interface UsuariosTableProps {
  rows: Usuario[];
  onChangeRol: (id: string, nuevoRol: "USUARIO" | "ADMINISTRADOR") => void;
}

export default function UsuariosTable({ rows, onChangeRol }: UsuariosTableProps) {
  const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "rol",
      headerName: "Rol",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.row.rol}
          onChange={(e) => onChangeRol(params.row._id, e.target.value as "USUARIO" | "ADMINISTRADOR")}
          size="small"
          sx={{ fontSize: "0.8rem", height: "30px" }}
        >
          <MenuItem value="USUARIO">USUARIO</MenuItem>
          <MenuItem value="ADMINISTRADOR">ADMINISTRADOR</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id!}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
