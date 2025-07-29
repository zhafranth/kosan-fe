import type { ApiResponse } from "@/config/axios";
import apiRequest from "@/config/axios";
import type {
  JenisFasilitasKosan,
  Kosan,
  KosanDetail,
  KosanPayload,
} from "./kosan.interface";

{
  /*===== KOSAN =====*/
}
export const getKosanList = async (params?: object) => {
  const response: ApiResponse<Kosan[]> = await apiRequest({
    method: "GET",
    url: "/kosan",
    params,
  });

  return response.data.data;
};

export const getKosanDetail = async (id: number) => {
  const response: ApiResponse<KosanDetail> = await apiRequest({
    method: "GET",
    url: `/kosan/${id}`,
  });

  return response.data.data;
};

export const createKosan = async (data?: KosanPayload) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "POST",
    url: "/kosan",
    data,
  });

  return response.data;
};

export const updateKosan = async (id?: number, data?: KosanPayload) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "PATCH",
    url: `/kosan/${id}`,
    data,
  });

  return response.data;
};

{
  /*===== JENIS FASILITAS KOSAN =====*/
}
export const getJenisFasilitasKosan = async () => {
  const response: ApiResponse<JenisFasilitasKosan[]> = await apiRequest({
    method: "GET",
    url: "/jenis-fasilitas-kosan",
  });

  return response.data.data;
};
