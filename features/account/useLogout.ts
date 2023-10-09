import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogout = ({onError, onSuccess}: any) => {

  return useMutation({
    mutationFn: async () => {
      const logoutResponse = await axiosInstance.post("/users/logout");
      return logoutResponse;
    },
    onError: (error: any) => {
      onError(error.response.data);
    },
    onSuccess: () => {
      onSuccess("Success");
    }
  });
};
