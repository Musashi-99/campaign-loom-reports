import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
