import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContex";

interface Props {
  allowedRoles: ("ADMINISTRADOR" | "USUARIO")[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const { rol } = useAuth();
  if (!rol || !allowedRoles.includes(rol)) return <Navigate to="/login" />;
  return <>{children}</>;
};