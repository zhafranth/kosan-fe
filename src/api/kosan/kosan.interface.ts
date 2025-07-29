import type { TipeKamar } from "../kamar/kamar.interface";

export interface Kosan {
  id: number;
  user_id: number;
  name: string;
  address: string | null;
  description: string | null;
  image: string | null;
  createdAt: string;
}

export interface KosanDetail extends Kosan {
  fasilitas: {
    id: number;
    name: string;
  }[];
  tipe_kamar: TipeKamar[];
}

export interface KosanPayload {
  user_id: number;
  name: string;
  address: string;
  description: string;
  image?: string;
  fasilitas?: number[];
}

export interface JenisFasilitasKosan {
  id: number;
  name: string;
}
