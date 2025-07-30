import type { ApiResponse } from "@/config/axios";
import type { UserPayload } from "./users.interface";
import apiRequest from "@/config/axios";

export const createUsers = async (data?: UserPayload) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "POST",
    url: "/users",
    data,
  });

  return response.data;
};
