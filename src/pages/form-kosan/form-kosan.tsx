import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Upload, X, Check } from "lucide-react";
import BackTitle from "@/components/dashboard/back-title";
import {
  useActionKosan,
  useGetJenisFasilitasKosanList,
  useGetKosanDetail,
} from "@/networks/kosan";
import { useNavigate, useSearchParams } from "react-router-dom";

// Definisi skema validasi dengan zod
const formSchema = z.object({
  name: z.string().min(3, { message: "Nama kosan minimal 3 karakter" }),
  address: z.string().min(5, { message: "Alamat minimal 5 karakter" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  fasilitas: z
    .array(z.number())
    .min(1, { message: "Pilih minimal 1 fasilitas" }),
  image: z.string().optional(),
});

// Tipe data untuk form
type FormValues = z.infer<typeof formSchema>;

const FormKosan = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);

  // Get id from query parameters
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // Get data kosan
  const { data: kosan, isLoading } = useGetKosanDetail(Number(id));

  // Options Jenis Fasilitas
  const { data } = useGetJenisFasilitasKosanList();
  const options = data?.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const { mutate } = useActionKosan();

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
      address: "",
      description: "",
      fasilitas: [],
      image: "",
    },
  });

  // Set Default value
  useEffect(() => {
    if (id && kosan) {
      const { address, name, description, fasilitas, image } = kosan || {};
      reset({
        name,
        address: address || "",
        description: description || "",
        fasilitas: fasilitas?.map((item) => item.id) || [],
        image: image || "",
      });
      setSelectedFacilities(fasilitas?.map((item) => item.id) || []);
    }
  }, [id, kosan, reset]);

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
    mutate(
      {
        id: id ? Number(id) : undefined,
        type: id ? "edit" : "create",
        data: {
          user_id: 1,
          name: data.name,
          address: data.address,
          description: data.description,
          image: data.image || undefined,
          fasilitas: data.fasilitas,
        },
      },
      {
        onSuccess: () => {
          if (!id) {
            navigate("/dashboard/dashboard");
          } else {
            navigate(-1);
          }
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
      <BackTitle title="Tambah Kosan Baru" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nama Kosan */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Nama Kosan <span className="text-red-500">*</span>
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
            placeholder="Masukkan nama kosan"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Alamat */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium">
            Alamat <span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            type="text"
            {...register("address")}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              "bg-background text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              errors.address ? "border-red-500" : "border-border"
            )}
            placeholder="Masukkan alamat kosan"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
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
            placeholder="Masukkan deskripsi kosan"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Fasilitas Kosan */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Fasilitas Kosan <span className="text-red-500">*</span>
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
            Gambar Kosan
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
          {isSubmitting ? "Menyimpan..." : "Simpan Kosan"}
        </button>
      </form>
    </div>
  );
};

export default FormKosan;
