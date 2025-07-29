import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Upload, X, Check } from "lucide-react";
import BackTitle from "@/components/dashboard/back-title";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useActionTipeKamar,
  useGetJenisFasilitasKamarList,
  useGetTipeKamarDetail,
} from "@/networks/kamar";

// Definisi skema validasi dengan zod
const formSchema = z.object({
  name: z.string().min(3, { message: "Nama tipe kamar minimal 3 karakter" }),
  price: z.string().min(1, { message: "Harga tidak boleh kosong" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  fasilitas: z
    .array(z.number())
    .min(1, { message: "Pilih minimal 1 fasilitas" }),
  image: z.string().optional(),
});

// Tipe data untuk form
type FormValues = z.infer<typeof formSchema>;

const FormTipeKamar = () => {
  const [searchParams] = useSearchParams();
  const kosanId = searchParams.get("kosan_id");
  const tipeKamarId = searchParams.get("id");

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);

  // Get data tipe kamar
  const { data: tipeKamar, isLoading } = useGetTipeKamarDetail(
    Number(tipeKamarId)
  );
  console.log("tipeKamar:", tipeKamar);

  // Options Jenis Fasilitas
  const { data } = useGetJenisFasilitasKamarList();
  const options = data?.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const { mutate } = useActionTipeKamar();

  const navigate = useNavigate();

  // Inisialisasi react-hook-form dengan zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      fasilitas: [],
      image: "",
    },
  });

  // Set Default value
  useEffect(() => {
    if (tipeKamarId && tipeKamar) {
      const { name, description, fasilitas, image, price } = tipeKamar || {};
      reset({
        name,
        description: description || "",
        price: String(price),
        fasilitas: fasilitas?.map((item) => item.id) || [],
        image: image || "",
      });
      setSelectedFacilities(fasilitas?.map((item) => item.id) || []);
    }
  }, [tipeKamarId, tipeKamar, reset]);

  // Handler untuk upload gambar
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.includes("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    // Buat URL untuk preview gambar
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setValue("image", result); // Simpan base64 string ke form
    };
    reader.readAsDataURL(file);
  };

  // Handler untuk menghapus gambar
  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("image", "");
  };

  // Handler untuk toggle fasilitas
  const toggleFacility = (facilityId: number) => {
    setSelectedFacilities((prev) => {
      if (prev.includes(facilityId)) {
        // Hapus fasilitas jika sudah dipilih
        const newFacilities = prev.filter((id) => id !== facilityId);
        setValue("fasilitas", newFacilities);
        return newFacilities;
      } else {
        // Tambahkan fasilitas jika belum dipilih
        const newFacilities = [...prev, facilityId];
        setValue("fasilitas", newFacilities);
        return newFacilities;
      }
    });
  };

  // Handler submit form
  const onSubmit = (data: FormValues) => {
    if (!kosanId) {
      alert("ID Kosan tidak ditemukan");
      return;
    }

    mutate(
      {
        type: tipeKamarId ? "edit" : "create",
        id: Number(tipeKamarId),
        data: {
          kosan_id: parseInt(kosanId),
          name: data.name,
          price: parseFloat(data.price),
          description: data.description,
          image: data.image || undefined,
          fasilitas: data.fasilitas,
        },
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "p-4 w-full",
        "transition-opacity duration-500",
        !isLoading ? "opacity-100" : "opacity-0"
      )}
    >
      <BackTitle title="Tambah Tipe Kamar" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nama Tipe Kamar */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Nama Tipe Kamar <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              "bg-background text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              errors.name ? "border-red-500" : "border-border"
            )}
            placeholder="Masukkan nama tipe kamar"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Harga */}
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium">
            Harga <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              Rp
            </span>
            <input
              id="price"
              type="number"
              {...register("price")}
              className={cn(
                "w-full pl-8 pr-3 py-2 border rounded-md",
                "bg-background text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                errors.price ? "border-red-500" : "border-border"
              )}
              placeholder="0"
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              "bg-background text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              errors.description ? "border-red-500" : "border-border"
            )}
            placeholder="Masukkan deskripsi tipe kamar"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Fasilitas Kamar */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Fasilitas Kamar <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {options?.map((facility) => (
              <div
                key={facility.id}
                onClick={() => toggleFacility(facility.id)}
                className={cn(
                  "flex items-center gap-2 p-2 border rounded-md cursor-pointer",
                  "transition-colors duration-200",
                  selectedFacilities.includes(facility.id)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center",
                    selectedFacilities.includes(facility.id)
                      ? "bg-primary border-primary"
                      : "border-border"
                  )}
                >
                  {selectedFacilities.includes(facility.id) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <span className="text-sm capitalize">{facility.name}</span>
              </div>
            ))}
          </div>
          {errors.fasilitas && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fasilitas.message}
            </p>
          )}
        </div>

        {/* Upload Gambar */}
        <div className="space-y-2">
          <label htmlFor="image" className="block text-sm font-medium">
            Gambar Kamar
          </label>

          {!previewImage ? (
            <div
              className={cn(
                "border-2 border-dashed rounded-md p-4",
                "flex flex-col items-center justify-center",
                "cursor-pointer hover:bg-muted/50 transition-colors",
                "h-40"
              )}
              onClick={() => document.getElementById("image")?.click()}
            >
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Klik untuk upload gambar
              </p>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <div className="relative h-40 w-full">
              <img
                src={previewImage}
                alt="Preview"
                className="h-full w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className={cn(
                  "absolute top-2 right-2 p-1 rounded-full",
                  "bg-red-500 text-white",
                  "hover:bg-red-600 transition-colors"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-2 px-4 rounded-md font-medium",
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Tipe Kamar"}
        </button>
      </form>
    </div>
  );
};

export default FormTipeKamar;
