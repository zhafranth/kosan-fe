import type { ApiResponse } from "@/config/axios";
import type {
  JenisFasilitasKamar,
  TipeKamar,
  TipeKamarPayload,
  TipeKamarDetail,
  KamarPayload,
  Kamar,
} from "./kamar.interface";
import apiRequest from "@/config/axios";

{
  /*===== JENIS FASILITAS KAMAR =====*/
}
export const getJenisFasilitasKamar = async () => {
  const response: ApiResponse<JenisFasilitasKamar[]> = await apiRequest({
    method: "GET",
    url: "/jenis-fasilitas-kamar",
  });

  return response.data.data;
};

{
  /*===== TIPE KAMAR =====*/
}
export const getTipeKamar = async () => {
  const response: ApiResponse<TipeKamar[]> = await apiRequest({
    method: "GET",
    url: "/tipe-kamar",
  });

  return response.data.data;
};

export const createKamar = async (data?: KamarPayload) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "POST",
    url: "/kamar",
    data,
  });

  return response.data;
};

export const createTipeKamar = async (data?: TipeKamarPayload) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "POST",
    url: "/tipe-kamar",
    data,
  });

  return response.data;
};

export const getTipeKamarDetail = async (id: number) => {
  const response: ApiResponse<TipeKamarDetail> = await apiRequest({
    method: "GET",
    url: `/tipe-kamar/${id}`,
  });

  return response.data.data;
};

export const updateTipeKamar = async (id?: number, data?: TipeKamarPayload) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "PATCH",
    url: `/tipe-kamar/${id}`,
    data,
  });

  return response.data;
};

{
  /*===== KAMAR =====*/
}
export const getKamarDetail = async (id: number) => {
  const response: ApiResponse<Kamar> = await apiRequest({
    method: "GET",
    url: `/kamar/${id}`,
  });

  return response.data.data;
};

export const updateKamar = async (id?: number, data?: KamarPayload) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "PATCH",
    url: `/kamar/${id}`,
    data,
  });

  return response.data;
};
