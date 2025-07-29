import { ThemeToggle } from "./ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background/70 backdrop-blur-lg border-b border-border/50"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">KosanApp</h1>
        </div>

        <nav className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium hover:text-primary">
            Beranda
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            Cari Kosan
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            Tentang
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            Kontak
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
