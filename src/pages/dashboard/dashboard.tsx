import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Header from "@/components/dashboard/header";
import Navigation from "@/components/dashboard/navigation";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  // Uncomment kode di bawah ini untuk implementasi autentikasi
  // const isAuthenticated = !!localStorage.getItem("token");
  // if (!isAuthenticated) return <Navigate to="/auth" />;

  const { pathname } = useLocation();

  // Pages that don't use dashboard layout
  const whitelistedPages = ["form-kosan", "other-page"];
  const cleanPath = pathname.split("/").filter(Boolean).slice(1).join("/");
  const withoutLayout = whitelistedPages.some((page) =>
    cleanPath.startsWith(page)
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (withoutLayout) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
      {/* Container dengan lebar maksimum mobile */}
      <div
        className={cn(
          "w-full max-w-md mx-auto min-h-screen pb-20", // pb-20 untuk memberikan ruang untuk bottom navigation
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Outlet />

        {/* Bottom Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default Dashboard;
