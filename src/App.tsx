import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import Home from "./pages/home";
import Auth from "./pages/auth";
import Kosan from "./pages/kosan";
import Kamar from "./pages/kamar";
import Dashboard from "./pages/dashboard";
import FormKosan from "./pages/form-kosan";
import TipeKamar from "./pages/tipe-kamar";
import DashboardHome from "./pages/dashboard-home";
import FormTipeKamar from "./pages/form-tipe-kamar";
import ProtectedRoute from "./config/protected-route";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Dashboard />}>
                <Route path="/dashboard" element={<DashboardHome />} />
              </Route>
              <Route path="form-kosan" element={<FormKosan />} />
              <Route path="form-tipe-kamar" element={<FormTipeKamar />} />
              <Route path="tipe-kamar/:id" element={<TipeKamar />} />
              <Route path="kosan/:id" element={<Kosan />} />
              <Route path="kamar/:id" element={<Kamar />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
