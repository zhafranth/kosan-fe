import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function HeroSection() {
  // State untuk mengontrol animasi
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect untuk memicu animasi setelah komponen dimount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background dengan efek glassmorphism */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070')] bg-cover bg-center opacity-10" />
      </div>

      {/* Blur circles untuk efek glassmorphism */}
      <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={cn(
            "max-w-3xl mx-auto text-center p-8 rounded-2xl",
            "bg-background/30 backdrop-blur-md border border-border/50",
            "shadow-lg shadow-blue-500/5 transition-all duration-700",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Temukan Kosan Impian Anda
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Berbagai pilihan kosan nyaman dengan fasilitas lengkap dan harga
            terjangkau
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <div
              className={cn(
                "flex-1 max-w-md",
                "bg-background/50 backdrop-blur-md border border-border/50 rounded-xl",
                "p-2 flex items-center shadow-md transition-all duration-500",
                "hover:shadow-blue-400/20 hover:border-blue-400/30"
              )}
            >
              <input
                type="text"
                placeholder="Cari lokasi atau nama kosan..."
                className="flex-1 bg-transparent border-none focus:outline-none px-3 py-2"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20">
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
