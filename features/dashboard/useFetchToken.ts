import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchToken = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async () => {
      const productsResponse = await axiosInstance.post("/users/refresh");
      return productsResponse;
    },
    onSuccess: (productResponse) => {
      onSuccess(productResponse.data);
    },
    onError
  });
};
