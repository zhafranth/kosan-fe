export interface JenisFasilitasKamar {
  id: number;
  name: string;
  icon: string | null;
  createdAt: string;
}

export interface TipeKamar {
  id: number;
  name: string;
  price: number;
  description: string;
  createdAt: string;
}

export interface TipeKamarDetail extends TipeKamar {
  kosan_id: number;
  image: string | null;
  fasilitas: {
    id: number;
    name: string;
  }[];
  kamar: Kamar[];
}

export interface TipeKamarPayload {
  kosan_id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  fasilitas?: number[];
}

export interface Kamar {
  id: number;
  no_room: string;
  status: "available" | "booked" | "booking";
  tipe_id: number;
}

export type KamarPayload = Omit<Kamar, "id">;
