import {
  getKosanList,
  createKosan,
  getJenisFasilitasKosan,
  getKosanDetail,
  updateKosan,
} from "@/api/kosan";
import type { KosanPayload } from "@/api/kosan/kosan.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

// ------ KOSAN ------- //

export const useGetKosanDetail = (id: number) => {
  return useQuery({
    queryKey: ["kosan", "detail", id],
    queryFn: () => getKosanDetail(id),
  });
};

export const useGetKosanList = (params?: object) => {
  return useQuery({
    queryKey: ["kosan", "list", params],
    queryFn: () => getKosanList(params),
  });
};

export const useActionKosan = () => {
  return useMutation({
    mutationFn: async ({
      id,
      type,
      data,
    }: {
      id?: number;
      type: "create" | "edit";
      data: KosanPayload;
    }) => {
      if (type === "create") {
        return createKosan(data);
      }
      return updateKosan(id, data);
    },
  });
};

// ------ JENIS FASILITAS KOSAN ------- //

export const useGetJenisFasilitasKosanList = () => {
  return useQuery({
    queryKey: ["jenis-fasilitas", "kosan", "list"],
    queryFn: () => getJenisFasilitasKosan(),
  });
};
