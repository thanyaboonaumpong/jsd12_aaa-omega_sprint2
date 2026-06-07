import { Navigate, Outlet } from "react-router-dom";

import { useAdminAuth } from "../../contexts/authAdminContext/useAdminAuth";
import { PageLoading } from "../../components/common/NotFound";

export default function AuthLayout() {

  const { user, loading } = useAdminAuth();

  if (loading) {
    return <PageLoading />;
  };
  if (user) {
    return <Navigate to="/admin" replace />;
  };

  return (
    <div className="dashboard min-w-dv min-h-dvh flex justify-center items-center p-5 md:p-10 bg-neutral-lighter">
      <main className="flex flex-col-reverse sm:flex-row w-200 h-fit gap-5 md:gap-10 p-5 md:p-10 rounded-2xl bg-white shadow-2xl/10">
        <Outlet />
      </main>
    </div>
  );

};