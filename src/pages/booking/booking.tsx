import BackTitle from "@/components/dashboard/back-title";
import { useGetKamarDetail } from "@/networks/kamar";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";
import { User2Icon } from "lucide-react";
import { useToggle } from "@/hooks/use-toggle";
import FormPenyewa from "./_component/form-penyewa";

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

const Booking = () => {
  const { id } = useParams();
  const { data: detail } = useGetKamarDetail(Number(id));
  const { no_room } = detail ?? {};

  const { isOpen, toggle } = useToggle();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
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
    reset();
  };

  // Handler submit form
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    // TODO: Implementasi submit data ke API
    onClose(); // Tutup drawer setelah submit
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <BackTitle title={`Booking Kamar ${no_room}`} />

      <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="px-6 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Form Booking Kamar
          </h1>
          <p className="text-gray-600 mt-2">
            Silakan lengkapi informasi booking untuk kamar {no_room}
          </p>
        </div>

        <div className="px-6 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User ID Select */}
            <div className="space-y-3">
              <Label
                htmlFor="user_id"
                className="text-sm font-semibold text-gray-700"
              >
                Pilih User *
              </Label>
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
                <p className="text-sm text-red-500 mt-1">
                  {errors.user_id.message}
                </p>
              )}
            </div>

            {/* Payment Type Select */}
            <div className="space-y-3">
              <Label
                htmlFor="payment_type"
                className="text-sm font-semibold text-gray-700"
              >
                Tipe Pembayaran *
              </Label>
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
                <p className="text-sm text-red-500 mt-1">
                  {errors.payment_type.message}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div className="space-y-3">
              <Label
                htmlFor="start_date"
                className="text-sm font-semibold text-gray-700"
              >
                Tanggal Mulai *
              </Label>
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
                <p className="text-sm text-red-500 mt-1">
                  {errors.start_date.message}
                </p>
              )}
            </div>

            {/* Status Select */}
            <div className="space-y-3">
              <Label
                htmlFor="status"
                className="text-sm font-semibold text-gray-700"
              >
                Status
              </Label>
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
                <p className="text-sm text-red-500 mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Duration Chips */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">
                Durasi *
              </Label>
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
                <p className="text-sm text-red-500 mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={toggle}
                  type="button"
                  variant="outline"
                  className="px-6 text-green-600 hover:text-green-700 border-green-600 hover:border-green-700 hover:bg-green-50 flex items-center gap-2"
                >
                  <User2Icon />
                  Tambah Users
                </Button>
                <Button
                  type="submit"
                  className="px-6 bg-blue-600 hover:bg-blue-700"
                >
                  Simpan Booking
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FormPenyewa isOpen={isOpen} toggle={toggle} />
    </div>
  );
};

export default Booking;
