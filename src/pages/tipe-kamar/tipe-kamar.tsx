import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import BackTitle from "@/components/dashboard/back-title";
import { useGetTipeKamarDetail } from "@/networks/kamar";
import { useToggle } from "@/hooks/use-toggle";
import FormKamar from "./_components/form-kamar";
import CardKamar from "./_components/card-kamar";

const TipeKamar = () => {
  const { id } = useParams<{ id: string }>();
  const { data: apiDetail, isFetching } = useGetTipeKamarDetail(Number(id));

  const { isOpen, toggle } = useToggle();

  const navigate = useNavigate();

  // Gunakan data dari API jika tersedia, jika tidak gunakan data dummy
  const detail = apiDetail;

  // Dummy image untuk tipe kamar jika tidak ada gambar
  const dummyImage =
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070";

  // Hitung jumlah kamar dan kamar yang tersedia
  const totalRooms = detail?.kamar?.length || 0;
  const availableRooms =
    detail?.kamar?.filter((room) => room.status === "available").length || 0;

  // Format harga ke format Rupiah
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("id-ID").format(Number(price));
  };

  return (
    <div
      className={cn(
        "container mx-auto py-8 px-4",
        "transition-opacity duration-500",
        !isFetching ? "opacity-100" : "opacity-0"
      )}
    >
      <BackTitle title="Detail Tipe Kamar" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Gambar Tipe Kamar */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <img
            src={detail?.image || dummyImage}
            alt={detail?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informasi Tipe Kamar */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{detail?.name}</h1>
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
                  <span className="font-medium">{totalRooms}</span> total kamar
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
                  <span className="font-medium">{availableRooms}</span> kamar
                  tersedia
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Harga</h2>
              <p className="text-2xl font-bold text-primary">
                Rp {detail?.price ? formatPrice(String(detail.price)) : 0}
                <span className="text-sm font-normal text-muted-foreground">
                  /bulan
                </span>
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Deskripsi</h2>
              <p className="text-sm text-muted-foreground">
                {detail?.description}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Fasilitas</h2>
              <div className="flex flex-wrap gap-2">
                {detail?.fasilitas?.map((facility) => (
                  <span
                    key={facility.id}
                    className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-sm"
                  >
                    {facility.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex items-center gap-2 w-full">
        <button
          onClick={() =>
            navigate(`/form-tipe-kamar?id=${id}&kosan_id=${detail?.kosan_id}`)
          }
          className="rounded-lg bg-primary px-3 w-full py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90"
        >
          Edit Tipe Kamar
        </button>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-border/50 my-8" />

      {/* Daftar Kamar */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Daftar Kamar</h2>
          <button
            className="text-xs font-medium text-primary flex items-center gap-1"
            onClick={toggle}
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
          {detail?.kamar?.map((room) => (
            <CardKamar room={room} />
          ))}
        </div>
      </div>
      <FormKamar isOpen={isOpen} toggle={toggle} />
    </div>
  );
};

export default TipeKamar;
