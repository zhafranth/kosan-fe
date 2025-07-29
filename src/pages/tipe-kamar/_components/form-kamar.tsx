import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useActionKamar } from "@/networks/kamar";
import { useParams } from "react-router-dom";
import type { Kamar } from "@/api/kamar/kamar.interface";

// Definisi skema validasi dengan zod
const formSchema = z.object({
  no_room: z.string().min(1, { message: "Nomor kamar tidak boleh kosong" }),
});

// Tipe data untuk form
type FormValues = z.infer<typeof formSchema>;

interface Props {
  isOpen: boolean;
  toggle: () => void;
  detail?: Kamar;
  type?: "create" | "edit";
}

const FormKamar = ({ detail, type = "create", isOpen, toggle }: Props) => {
  const { id: tipeID } = useParams();
  // Inisialisasi react-hook-form dengan zod resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      no_room: detail?.no_room || "",
    },
  });

  const { mutate } = useActionKamar();

  const onClose = () => {
    toggle();
    reset();
  };

  // Handler submit form
  const onSubmit = (data: FormValues) => {
    mutate(
      {
        type,
        id: detail?.id,
        data: {
          no_room: data.no_room,
          tipe_id: Number(tipeID),
          status: detail?.status || "available",
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
    // Implementasi submit data ke API bisa ditambahkan di sini
    onClose(); // Tutup drawer setelah submit
  };

  return (
    <Drawer open={isOpen} onOpenChange={toggle}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tambah Kamar</DrawerTitle>
          <DrawerDescription>
            Tambahkan kamar baru untuk tipe kamar ini.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nomor Kamar */}
            <div className="space-y-2">
              <label htmlFor="no_room" className="block text-sm font-medium">
                Nomor Kamar <span className="text-red-500">*</span>
              </label>
              <input
                id="no_room"
                type="text"
                {...register("no_room")}
                className={cn(
                  "w-full px-3 py-2 border rounded-md",
                  "bg-background text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  errors.no_room ? "border-red-500" : "border-border"
                )}
                placeholder="Masukkan nomor kamar"
              />
              {errors.no_room && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.no_room.message}
                </p>
              )}
            </div>
          </form>
        </div>

        <DrawerFooter>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
          <Button onClick={onClose} variant="outline">
            Batal
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FormKamar;
