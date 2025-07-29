import type React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
}

const BackTitle: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="flex gap-x-3 items-center mb-6">
      <button
        onClick={handleBack}
        className={cn(
          "p-2 rounded-full",
          "bg-background hover:bg-muted/50",
          "transition-colors duration-200",
          "flex items-center justify-center"
        )}
        aria-label="Kembali"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default BackTitle;
