import { Outlet } from "react-router-dom";
import { Navbar } from "../organims/navbar";
import { Footer } from "../organims/footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export { MainLayout };