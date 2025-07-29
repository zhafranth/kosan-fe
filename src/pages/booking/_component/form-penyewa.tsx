// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  // detail?: Kamar;
  // type?: "create" | "edit";
}

const FormPenyewa = ({ isOpen, toggle }: Props) => {
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
          <h2>Hellow</h2>
        </div>

        <DrawerFooter>
          {/* <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button> */}
          <Button onClick={toggle} variant="outline">
            Batal
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FormPenyewa;
