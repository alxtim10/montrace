import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useChangePassword = ({ onError, onSuccess }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const loginResponse = await axiosInstance.put(`/users/password`, body);

      return loginResponse;
    },
    onError: (error: any) => {
      onError(error.response.data);
    },
    onSuccess: () => {
      onSuccess("Success");
    },
  });
};
