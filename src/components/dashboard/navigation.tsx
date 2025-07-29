import { cn } from "@/lib/utils";
import { useState } from "react";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 z-50">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            activeTab === "dashboard" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          <span className="text-xs mt-1">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("properties")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            activeTab === "properties"
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xs mt-1">Properti</span>
        </button>

        <button
          onClick={() => setActiveTab("tenants")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            activeTab === "tenants" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-xs mt-1">Penyewa</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            activeTab === "profile" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-xs mt-1">Profil</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
