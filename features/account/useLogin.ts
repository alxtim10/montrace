import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = ({onError, onSuccess}: any) => {

  return useMutation({
    mutationFn: async (body: any) => {
      const registerResponse = await axiosInstance.post("/users/login", body);
      console.log(registerResponse);
      return registerResponse;
    },
    onError: (error: any) => {
      onError(error.response.data);
    },
    onSuccess: () => {
      onSuccess("Success");
    }
  });
};
