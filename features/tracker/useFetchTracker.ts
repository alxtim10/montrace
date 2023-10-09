import { axiosInstance, axiosJWT } from "@/lib/axios";
import { useAppSelector } from "@/stores/hooks";
import { store } from "@/stores/store";
import { currentUserId } from "@/stores/tokenState";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "react-redux";

export const useFetchTracker = ({ onSuccess, onError }: any) => {
  //   const tokenState = store.getState();
  //   const { accessToken }: any = tokenState.tokenField;

  const userId = useAppSelector(currentUserId);

  return useQuery({
    queryFn: async () => {
      const trackerResponse = await axiosInstance.get(`/tracker/` + userId);
      return trackerResponse;
    },
    queryKey: ["userId"],
    onSuccess: (trackerResponse) => {
      onSuccess(trackerResponse.data);
    },
    onError: (error: any) => {
      onError(error.response);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
