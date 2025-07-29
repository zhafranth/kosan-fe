import { data } from "@/data/kosan.json";
import { cn } from "@/lib/utils";
import { useGetKosanList } from "@/networks/kosan";
import { useNavigate } from "react-router-dom";

// Tipe data untuk kosan
interface KosanData {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  facilities: string[];
  rating: number;
  status: "available" | "rented" | "maintenance";
}

// Data dummy kosan untuk ditampilkan
const dummyKosanData: KosanData[] = data?.map((kosan) => ({
  id: kosan.id,
  name: kosan.name,
  location: kosan.location,
  price: kosan.price,
  imageUrl: kosan.imageUrl,
  facilities: kosan.facilities,
  rating: kosan.rating,
  status: kosan.status as "available" | "rented" | "maintenance",
}));

// Komponen untuk menampilkan kartu kosan dengan status
const KosanManagementCard = ({ kosan }: { kosan: KosanData }) => {
  const navigate = useNavigate();
  const getStatusColor = (status: KosanData["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "rented":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "maintenance":
        return "bg-amber-500/20 text-amber-700 dark:text-amber-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  const getStatusText = (status: KosanData["status"]) => {
    switch (status) {
      case "available":
        return "Tersedia";
      case "rented":
        return "Disewa";
      case "maintenance":
        return "Perbaikan";
      default:
        return "Tidak diketahui";
    }
  };

  return (
    <div
      onClick={() => navigate(`/kosan/${kosan.id}`)}
      className={cn(
        "relative overflow-hidden rounded-xl transition-all",
        "bg-card/40 backdrop-blur-md border border-border/50",
        "hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      <div className="flex">
        <div className="w-1/3 h-24 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070"
            alt={kosan.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-2/3 p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{kosan.name}</h3>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                getStatusColor(kosan.status)
              )}
            >
              {getStatusText(kosan.status)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1">{kosan.location}</p>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-primary">
              Rp 15.000.000
              <span className="text-xs font-normal text-muted-foreground">
                /bln
              </span>
            </p>
            <button className="rounded-lg bg-primary/10 text-primary px-2 py-1 text-xs font-medium hover:bg-primary/20">
              Kelola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const navigate = useNavigate();

  const { data } = useGetKosanList();

  return (
    <main className="p-4">
      {/* Ringkasan */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-muted-foreground">
              Total Kosan
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <p className="text-2xl font-bold mt-2">{dummyKosanData.length}</p>
        </div>

        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-muted-foreground">
              Tersedia
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <p className="text-2xl font-bold mt-2">
            {dummyKosanData.filter((k) => k.status === "available").length}
          </p>
        </div>

        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-muted-foreground">
              Disewa
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <p className="text-2xl font-bold mt-2">
            {dummyKosanData.filter((k) => k.status === "rented").length}
          </p>
        </div>

        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-muted-foreground">
              Perbaikan
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-500"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <p className="text-2xl font-bold mt-2">
            {dummyKosanData.filter((k) => k.status === "maintenance").length}
          </p>
        </div>
      </div>

      {/* Daftar Kosan */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Daftar Kosan</h2>
          <button
            className="text-xs font-medium text-primary flex items-center gap-1"
            onClick={() => navigate("/form-kosan")}
          >
            Tambah
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {data?.map((kosan) => (
            <KosanManagementCard key={kosan.id} kosan={kosan} />
          ))}
        </div>
      </div>

      {/* Aktivitas Terbaru (Placeholder) */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-3">
          <div className="p-3 rounded-lg border border-border/50 bg-card/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm">Pembayaran diterima</p>
                <p className="text-xs text-muted-foreground">
                  Kosan Bahagia - Rp 1.500.000
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              2 jam yang lalu
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-card/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <p className="text-sm">Permintaan perbaikan</p>
                <p className="text-xs text-muted-foreground">
                  Kosan Nyaman - AC rusak
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              1 hari yang lalu
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;
