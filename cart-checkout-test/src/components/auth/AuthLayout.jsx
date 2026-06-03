import { Outlet } from "react-router-dom";

export default function AuthLayout() {

  return (
    <div className="dashboard min-w-dv min-h-dvh flex justify-center items-center p-5 md:p-10 bg-neutral-lighter">
      <main className="flex flex-col-reverse sm:flex-row w-200 h-fit gap-5 md:gap-10 p-5 md:p-10 rounded-2xl bg-white shadow-2xl/10">
        <Outlet />
      </main>
    </div>
  );

};