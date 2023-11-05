import { Navigate, Outlet } from "react-router-dom";
import sessionAdmin from "../../utils/sessionAdmin";
// eslint-disable-next-line react/prop-types
const AUthRoleAdmin = () => {
  const session = sessionAdmin();
  if (session && session.role === "Admin") {
    return <Outlet />;
  } else if (session && session.role === "Counselors") {
    return <Navigate to="/chat" />;
  }
  return <Navigate replace to="/login" />;
};

export default AUthRoleAdmin;
