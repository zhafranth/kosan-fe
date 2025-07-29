import BackTitle from "@/components/dashboard/back-title";
import { useGetKamarDetail } from "@/networks/kamar";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

const Kamar = () => {
  const { id } = useParams();
  const { data: detail } = useGetKamarDetail(Number(id));
  const { no_room, status } = detail ?? {};

  // Data dummy penghuni (karena tidak ada data penghuni di API)
  const penghuni = {
    nama: "John Doe",
    foto: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000",
    durasi: "6 bulan",
    tanggalJatuhTempo: "30 Juni 2024",
  };

  // Fungsi untuk mendapatkan warna status kamar
  const getStatusColor = (
    status: "available" | "booked" | "booking" | undefined
  ) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "booked":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "booking":
        return "bg-amber-500/20 text-amber-700 dark:text-amber-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  // Fungsi untuk mendapatkan teks status kamar
  const getStatusText = (
    status: "available" | "booked" | "booking" | undefined
  ) => {
    switch (status) {
      case "available":
        return "Tersedia";
      case "booked":
        return "Disewa";
      case "booking":
        return "Perbaikan";
      default:
        return "Tidak diketahui";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <BackTitle title={`Kamar ${no_room}`} />

      {/* Informasi Kamar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Informasi Kamar
          </h2>

          <div className="space-y-6">
            <div className="group hover:bg-primary/5 p-4 rounded-xl transition-all duration-300">
              <p className="text-muted-foreground text-sm uppercase tracking-wider">
                Nomor Kamar
              </p>
              <p className="text-3xl font-semibold mt-2 text-foreground">
                {no_room || "-"}
              </p>
            </div>

            <div className="group hover:bg-primary/5 p-4 rounded-xl transition-all duration-300">
              <p className="text-muted-foreground text-sm uppercase tracking-wider">
                Status
              </p>
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-transform hover:scale-105",
                    getStatusColor(status)
                  )}
                >
                  {getStatusText(status)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Card Penghuni */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl shadow-lg border border-blue-100/50 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            ID Card Penghuni
          </h2>

          {status === "booked" ? (
            <div className="flex flex-col items-center">
              {/* Foto Penghuni */}
              <div className="mb-4">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-white border-4 border-blue-200/50 shadow-xl">
                  <img
                    src={penghuni.foto}
                    alt={penghuni.nama}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Detail Penghuni */}
              <div className="w-full space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {penghuni.nama}
                  </p>
                  <div className="h-1 w-20 bg-blue-200 mx-auto mt-2 rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group hover:bg-blue-50 p-4 rounded-xl transition-all duration-300 bg-white/50 shadow-sm">
                    <p className="text-muted-foreground text-sm uppercase tracking-wider">
                      Durasi Sewa
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {penghuni.durasi}
                    </p>
                  </div>

                  <div className="group hover:bg-blue-50 p-4 rounded-xl transition-all duration-300 bg-white/50 shadow-sm">
                    <p className="text-muted-foreground text-sm uppercase tracking-wider">
                      Jatuh Tempo
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {penghuni.tanggalJatuhTempo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 bg-white/50 rounded-xl border-2 border-dashed border-blue-200 shadow-inner">
              <p className="text-muted-foreground text-lg">
                Tidak ada penghuni saat ini
              </p>
              <button
                className="mt-4 text-blue-400 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => {
                  // Add user logic here
                  console.log("Add new user clicked");
                }}
              >
                <PlusCircle />
                Tambah Penghuni
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kamar;
