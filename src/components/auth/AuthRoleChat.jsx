import { Navigate } from "react-router-dom";
import sessionAdmin from "../../utils/sessionAdmin";
// eslint-disable-next-line react/prop-types
const AUthRoleChat = ({ children }) => {
  const session = sessionAdmin();
  if (
    (session && session.role === "Admin") ||
    (session && session.role === "Counselors")
  ) {
    return children;
  }
  return <Navigate replace to="/login" />;
};

export default AUthRoleChat;
