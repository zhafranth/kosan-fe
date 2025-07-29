import { useState } from "react";
import { Navbar } from "../../components/navbar";
import { HeroSection } from "../../components/hero-section";
import { KosanCard } from "../../components/kosan-card";

// Data dummy untuk kosan
const DUMMY_KOSAN = [
  {
    id: "1",
    name: "Kosan Sejahtera",
    location: "Jl. Margonda Raya No. 10, Depok",
    price: 1500000,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070",
    facilities: ["WiFi", "AC", "Kamar Mandi Dalam"],
    rating: 4.5,
  },
  {
    id: "2",
    name: "Kosan Bahagia",
    location: "Jl. Kemang Raya No. 15, Jakarta Selatan",
    price: 2000000,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080",
    facilities: ["WiFi", "AC", "Dapur Bersama", "Laundry"],
    rating: 4.2,
  },
  {
    id: "3",
    name: "Kosan Nyaman",
    location: "Jl. Cikini Raya No. 5, Jakarta Pusat",
    price: 1800000,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070",
    facilities: ["WiFi", "Kamar Mandi Dalam", "Parkir Motor"],
    rating: 4.0,
  },
  {
    id: "4",
    name: "Kosan Tentram",
    location: "Jl. Tebet Barat No. 20, Jakarta Selatan",
    price: 1700000,
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074",
    facilities: ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur"],
    rating: 4.3,
  },
  {
    id: "5",
    name: "Kosan Harmoni",
    location: "Jl. Gatot Subroto No. 30, Jakarta Selatan",
    price: 2200000,
    imageUrl: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070",
    facilities: ["WiFi", "AC", "Kamar Mandi Dalam", "TV", "Kulkas"],
    rating: 4.7,
  },
  {
    id: "6",
    name: "Kosan Damai",
    location: "Jl. Sudirman No. 45, Jakarta Pusat",
    price: 2500000,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158",
    facilities: ["WiFi", "AC", "Kamar Mandi Dalam", "TV", "Kulkas", "Meja Kerja"],
    rating: 4.8,
  },
];

const Home = () => {
  const [kosanList] = useState(DUMMY_KOSAN);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        
        <section className="py-16 container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Rekomendasi Kosan</h2>
            <button className="text-sm font-medium text-primary hover:underline">
              Lihat Semua
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kosanList.map((kosan) => (
              <KosanCard key={kosan.id} {...kosan} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-background/70 backdrop-blur-md border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2023 KosanApp. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
