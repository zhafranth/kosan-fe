import { createUsers } from "@/api/users";
import type { UserPayload } from "@/api/users/users.interface";
import { useMutation } from "@tanstack/react-query";

export const useActionUsers = () => {
  return useMutation({
    mutationFn: async ({
      // id,
      type,
      data,
    }: {
      // id?: number;
      type: "create" | "edit";
      data: UserPayload;
    }) => {
      if (type === "create") {
        return createUsers(data);
      }
      return createUsers(data);
    },
  });
};
