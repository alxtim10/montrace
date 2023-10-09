import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchToken = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async () => {
      const tokenResponse = await axiosInstance.post("/users/refresh");
      return tokenResponse;
    },
    onSuccess: (tokenResponse) => {
      onSuccess(tokenResponse.data);
    },
    onError
  });
};
