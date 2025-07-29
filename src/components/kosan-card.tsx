import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface KosanCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  facilities: string[];
  rating: number;
}

export function KosanCard({
  id,
  name,
  location,
  price,
  imageUrl,
  facilities,
  rating,
}: KosanCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl transition-all",
      "bg-card/40 backdrop-blur-md border border-border/50",
      "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    )}>
      <div className="aspect-video w-full overflow-hidden rounded-t-xl">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">{location}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {facilities.map((facility, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-secondary/50 px-2 py-1 text-xs"
            >
              {facility}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="font-semibold text-primary">
            Rp {price.toLocaleString("id-ID")}<span className="text-xs font-normal text-muted-foreground">/bulan</span>
          </p>
          <Link to={`/kosan/${id}`} className="rounded-lg bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:bg-primary/90 inline-block text-center">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}