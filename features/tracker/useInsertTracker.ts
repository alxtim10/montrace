import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useInsertTracker = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const trackerResponse = await axiosInstance.post("/tracker", body);
      return trackerResponse;
    },
    onSuccess: (productResponse) => {
      onSuccess(productResponse.data);
    },
    onError: (error: any) => {
      onError(error.response.data);
    },
  });
};
