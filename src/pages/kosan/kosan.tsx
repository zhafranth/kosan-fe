import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import BackTitle from "@/components/dashboard/back-title";
import { useGetKosanDetail } from "@/networks/kosan";

// Dummy data untuk detail kosan
const DUMMY_KOSAN_DETAIL = {
  id: "1",
  name: "Kosan Bahagia",
  location: "Jl. Merdeka No. 123, Jakarta",
  description:
    "Kosan nyaman dengan lingkungan yang tenang dan strategis. Dekat dengan pusat perbelanjaan, rumah sakit, dan kampus. Akses transportasi mudah dengan keamanan 24 jam.",
  price: 1500000,
  imageUrl:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070",
  facilities: [
    "AC",
    "Wifi",
    "Kamar Mandi Dalam",
    "Dapur Bersama",
    "Ruang Tamu",
    "Parkir Motor",
    "Listrik",
  ],
  rating: 4.5,
  status: "available",
  roomTypes: [
    {
      id: "1",
      name: "Kamar Standard",
      description:
        "Kamar ukuran 3x3 meter dengan tempat tidur single, meja belajar, dan lemari pakaian.",
      price: 1500000,
      imageUrl:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070",
      facilities: ["Tempat Tidur", "Meja Belajar", "Lemari"],
      availableRooms: 5,
    },
    {
      id: "2",
      name: "Kamar Deluxe",
      description:
        "Kamar ukuran 4x4 meter dengan tempat tidur double, meja belajar, lemari pakaian, dan AC.",
      price: 2000000,
      imageUrl:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070",
      facilities: ["Tempat Tidur Double", "Meja Belajar", "Lemari Besar", "AC"],
      availableRooms: 3,
    },
    {
      id: "3",
      name: "Kamar Premium",
      description:
        "Kamar ukuran 5x5 meter dengan tempat tidur queen size, meja belajar, lemari pakaian besar, AC, dan kamar mandi dalam.",
      price: 2500000,
      imageUrl:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057",
      facilities: [
        "Tempat Tidur Queen Size",
        "Meja Belajar",
        "Lemari Besar",
        "AC",
        "Kamar Mandi Dalam",
      ],
      availableRooms: 2,
    },
  ],
};

const Kosan = () => {
  const { id } = useParams<{ id: string }>();
  const { data: detail, isFetching: isLoaded } = useGetKosanDetail(Number(id));

  const { name, fasilitas, tipe_kamar = [] } = detail || {};

  // Menggunakan destructuring assignment untuk menghindari warning 'setKosan' tidak digunakan
  const [kosan] = useState(DUMMY_KOSAN_DETAIL);

  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "container mx-auto py-8 px-4",
        "transition-opacity duration-500",
        !isLoaded ? "opacity-100" : "opacity-0"
      )}
    >
      <BackTitle title="Detail Kosan" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Gambar Kosan */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <img
            src={kosan.imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informasi Kosan */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-muted-foreground"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                <span className="text-sm">
                  <span className="font-medium">{kosan.roomTypes.length}</span>{" "}
                  tipe kamar
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-muted-foreground"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">
                  <span className="font-medium">
                    {kosan.roomTypes.reduce(
                      (acc, room) => acc + room.availableRooms,
                      0
                    )}
                  </span>{" "}
                  kamar tersedia
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Fasilitas</h2>
              <div className="flex flex-wrap gap-2">
                {fasilitas?.map((facility, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-sm"
                  >
                    {facility.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <button
            onClick={() => navigate(`/form-kosan?id=${id}`)}
            className="rounded-lg bg-primary px-3 w-full py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90"
          >
            Edit Kosan
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-border/50 my-8" />

      {/* Room Types Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold ">Tipe Kamar</h2>
          <button
            className="text-xs font-medium text-primary flex items-center gap-1"
            onClick={() =>
              navigate({
                pathname: "/form-tipe-kamar",
                search: `?kosan_id=${id}`,
              })
            }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tipe_kamar?.map((room) => (
            <div
              onClick={() => navigate(`/tipe-kamar/${room.id}`)}
              key={room.id}
              className={cn(
                "group overflow-hidden rounded-xl transition-all",
                "bg-card/40 backdrop-blur-md border border-border/50",
                "hover:shadow-lg hover:shadow-primary/5"
              )}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070"
                  }
                  alt={room.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {room.description}
                </p>

                {/* <div className="flex flex-wrap gap-1 mb-3">
                  {room.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-secondary/30 px-2 py-0.5 text-xs"
                    >
                      {facility}
                    </span>
                  ))}
                </div> */}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">
                      Rp {room.price.toLocaleString()}
                      <span className="text-xs font-normal text-muted-foreground">
                        /bulan
                      </span>
                    </p>
                    {/* <p className="text-xs text-muted-foreground">
                      {room.availableRooms} kamar tersedia
                    </p> */}
                  </div>
                  <button className="rounded-lg bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    Pilih
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kosan;
