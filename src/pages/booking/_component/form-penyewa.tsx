import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useActionUsers } from "@/networks/users";

// Schema validasi menggunakan Zod
const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  isOpen: boolean;
  toggle: () => void;
  // detail?: Kamar;
  // type?: "create" | "edit";
}

const FormPenyewa = ({ isOpen, toggle }: Props) => {
  const { mutate } = useActionUsers();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate({
      type: "create",
      data,
    });
    reset();
    toggle();
  };

  return (
    <Drawer open={isOpen} onOpenChange={toggle}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Form Data Penyewa</DrawerTitle>
          <DrawerDescription>
            Masukkan data penyewa untuk melakukan booking.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan alamat email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </form>

        <DrawerFooter>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
          <Button onClick={toggle} variant="outline">
            Batal
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FormPenyewa;
