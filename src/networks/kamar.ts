// ------ JENIS FASILITAS KOSAN ------- //

import {
  createTipeKamar,
  getJenisFasilitasKamar,
  getTipeKamarDetail,
  updateTipeKamar,
  createKamar,
  getKamarDetail,
  updateKamar,
} from "@/api/kamar";
import type {
  KamarPayload,
  TipeKamarPayload,
} from "@/api/kamar/kamar.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetJenisFasilitasKamarList = () => {
  return useQuery({
    queryKey: ["jenis-fasilitas", "kamar", "list"],
    queryFn: () => getJenisFasilitasKamar(),
  });
};

export const useActionKamar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      type,
      data,
    }: {
      id?: number;
      type: "create" | "edit";
      data: KamarPayload;
    }) => {
      if (type === "create") {
        return createKamar(data);
      }
      return updateKamar(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tipe-kamar", "detail"],
      });
    },
  });
};
export const useActionTipeKamar = () => {
  return useMutation({
    mutationFn: async ({
      id,
      type,
      data,
    }: {
      id?: number;
      type: "create" | "edit";
      data: TipeKamarPayload;
    }) => {
      if (type === "create") {
        return createTipeKamar(data);
      }
      return updateTipeKamar(id, data);
    },
  });
};

export const useGetTipeKamarDetail = (id: number) => {
  return useQuery({
    queryKey: ["tipe-kamar", "detail", id],
    queryFn: () => getTipeKamarDetail(id),
    enabled: !!id,
  });
};

export const useGetKamarDetail = (id?: number) => {
  return useQuery({
    queryKey: ["kamar", "detail", id],
    queryFn: () => getKamarDetail(Number(id)),
    enabled: !!id,
  });
};
