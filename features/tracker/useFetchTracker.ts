import { axiosInstance, axiosJWT } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchTracker = ({ onSuccess, onError }: any) => {
//   const tokenState = store.getState();
//   const { accessToken }: any = tokenState.tokenField;
  return useQuery({
    queryFn: async () => {
      const trackerResponse = await axiosInstance.get("/tracker");
      return trackerResponse;
    },
    queryKey: ['fetch.tracker'],
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
