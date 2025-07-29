import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  // detail?: Kamar;
  // type?: "create" | "edit";
}

// Definisi skema validasi dengan zod
const formSchema = z.object({
  user_id: z.string().min(1, "User harus dipilih"),
  payment_type: z.enum(["month", "year"]),
  start_date: z.string().min(1, "Tanggal mulai harus diisi"),
  status: z.enum(["pending", "reject", "success"]),
  duration: z.string().min(1, "Durasi harus dipilih"),
});

// Tipe data untuk form
type FormValues = z.infer<typeof formSchema>;

const FormBooking = ({ isOpen, toggle }: Props) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      payment_type: "month",
      start_date: new Date().toISOString().split("T")[0],
      status: "success",
      duration: "1",
    },
  });

  const onClose = () => {
    toggle();
    reset();
  };

  // Handler submit form
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    // TODO: Implementasi submit data ke API
    onClose(); // Tutup drawer setelah submit
  };
  return (
    <Drawer open={isOpen} onOpenChange={toggle}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tambah Penghuni</DrawerTitle>
          <DrawerDescription>
            Tambahkan penghuni baru untuk kamar ini.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* User ID Select */}
            <div className="space-y-2">
              <Label htmlFor="user_id">Pilih User</Label>
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => {
                  const userOptions = [
                    {
                      value: "1",
                      label: "Ahmad Rizki - ahmad.rizki@email.com",
                    },
                    {
                      value: "2",
                      label: "Siti Nurhaliza - siti.nurhaliza@email.com",
                    },
                    {
                      value: "3",
                      label: "Budi Santoso - budi.santoso@email.com",
                    },
                    { value: "4", label: "Maya Sari - maya.sari@email.com" },
                    {
                      value: "5",
                      label: "Dedi Kurniawan - dedi.kurniawan@email.com",
                    },
                    { value: "6", label: "Rina Wati - rina.wati@email.com" },
                    {
                      value: "7",
                      label: "Andi Pratama - andi.pratama@email.com",
                    },
                    {
                      value: "8",
                      label: "Lestari Dewi - lestari.dewi@email.com",
                    },
                    {
                      value: "9",
                      label: "Fajar Ramadhan - fajar.ramadhan@email.com",
                    },
                    {
                      value: "10",
                      label: "Indah Permata - indah.permata@email.com",
                    },
                  ];

                  return (
                    <SearchableSelect
                      {...field}
                      id="user_id"
                      placeholder="Pilih User"
                      searchPlaceholder="Cari nama atau email..."
                      options={userOptions}
                    />
                  );
                }}
              />
              {errors.user_id && (
                <p className="text-sm text-red-500">{errors.user_id.message}</p>
              )}
            </div>

            {/* Payment Type Select */}
            <div className="space-y-2">
              <Label htmlFor="payment_type">Tipe Pembayaran</Label>
              <Controller
                name="payment_type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="payment_type"
                    placeholder="Pilih Tipe Pembayaran"
                  >
                    <SelectItem value="month">Bulanan</SelectItem>
                    <SelectItem value="year">Tahunan</SelectItem>
                  </Select>
                )}
              />
              {errors.payment_type && (
                <p className="text-sm text-red-500">
                  {errors.payment_type.message}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start_date">Tanggal Mulai</Label>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      if (date) {
                        // Format date to YYYY-MM-DD without timezone issues
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const day = String(date.getDate()).padStart(2, "0");
                        field.onChange(`${year}-${month}-${day}`);
                      } else {
                        field.onChange("");
                      }
                    }}
                    placeholder="Pilih tanggal mulai"
                    className={errors.start_date ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.start_date && (
                <p className="text-sm text-red-500">
                  {errors.start_date.message}
                </p>
              )}
            </div>

            {/* Status Select */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} id="status" disabled>
                    <SelectItem value="">Pilih Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            {/* Duration Chips */}
            <div className="space-y-2">
              <Label>Durasi</Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => {
                  const durationOptions = [
                    { value: "1", label: "1 Bulan" },
                    { value: "3", label: "3 Bulan" },
                    { value: "6", label: "6 Bulan" },
                    { value: "12", label: "1 Tahun" },
                  ];

                  return (
                    <div className="flex flex-wrap gap-2">
                      {durationOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => field.onChange(option.value)}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                            "border border-border hover:border-primary/50",
                            "focus:outline-none focus:ring-2 focus:ring-primary/20",
                            field.value === option.value
                              ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                              : "bg-background text-foreground hover:bg-blue-50 hover:border-blue-300"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  );
                }}
              />
              {errors.duration && (
                <p className="text-sm text-red-500">
                  {errors.duration.message}
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

export default FormBooking;
