import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "../organims/navbar";
import { Footer } from "../organims/footer";
import { TransitionPage } from "./transitionPage";
import { useScrollTop } from "../../hooks/hookGlobals/useScrollTop";

function MainLayout() {
  const location = useLocation()
  useScrollTop()
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <TransitionPage key={location.pathname}>
            <Outlet />
          </TransitionPage>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export { MainLayout };