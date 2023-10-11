import { axiosInstance, axiosJWT } from "@/lib/axios";
import { useAppSelector } from "@/stores/hooks";
import { store } from "@/stores/store";
import { currentUserId } from "@/stores/tokenState";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "react-redux";

export const useGetUser = ({ onSuccess, onError }: any) => {

  return useQuery({
    queryFn: async () => {
      const userResponse = await axiosInstance.get(`/users/`);
      return userResponse;
    },
    queryKey: ["userId"],
    onSuccess: (userResponse) => {
      onSuccess(userResponse.data);
    },
    onError: (error: any) => {
      onError(error.response);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
