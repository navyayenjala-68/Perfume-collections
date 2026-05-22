import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {

  const { user, loadingUser } = useContext(AuthContext);

  if (loadingUser) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 text-slate-950">
        <p className="font-bold">Checking your session...</p>
      </div>
    );
  }

  // If user not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
