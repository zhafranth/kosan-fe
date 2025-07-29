import type { Kamar } from "@/api/kamar/kamar.interface";
import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import FormKamar from "./form-kamar";
import { useToggle } from "@/hooks/use-toggle";
import { useNavigate } from "react-router-dom";

interface Props {
  room: Kamar;
}

const CardKamar = ({ room }: Props) => {
  const { toggle, isOpen } = useToggle();

  const navigate = useNavigate();

  // Fungsi untuk mendapatkan warna status kamar
  const getStatusColor = (status: "available" | "booked" | "booking") => {
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
  const getStatusText = (status: "available" | "booked" | "booking") => {
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
    <div
      key={room.id}
      className={cn(
        "p-6 rounded-xl border shadow-sm hover:shadow-md",
        "transition-all duration-300 transform hover:-translate-y-1",
        "flex flex-col gap-4",
        "bg-background/50 backdrop-blur-sm"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            room.status === "available" && "bg-green-500",
            room.status === "booked" && "bg-blue-500",
            room.status === "booking" && "bg-amber-500"
          )}
        />
        <h3 className="text-lg font-semibold tracking-tight">{room.no_room}</h3>
        <div className="flex ml-auto gap-2">
          <button
            onClick={toggle}
            className={cn(
              "p-1 rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-gray-800",
              "transition-colors duration-200",
              "border border-blue-400 text-blue-400"
            )}
          >
            <EditIcon size={14} />
          </button>
        </div>
      </div>

      {room.status === "booked" && (
        <div className="flex flex-col gap-2 p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              Penyewa:{" "}
              <span className="text-blue-600 dark:text-blue-400">John Doe</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              Sisa Sewa:{" "}
              <span className="text-blue-600 dark:text-blue-400">6 bulan</span>
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <span
          className={cn(
            "text-sm font-medium px-3 py-1.5 rounded-lg",
            getStatusColor(room.status)
          )}
        >
          {getStatusText(room.status)}
        </span>

        <button
          className="text-sm text-primary hover:text-primary/80 font-medium"
          onClick={() => navigate(`/kamar/${room?.id}`)}
        >
          Lihat Detail →
        </button>
      </div>
      <FormKamar isOpen={isOpen} toggle={toggle} detail={room} type="edit" />
    </div>
  );
};

export default CardKamar;
