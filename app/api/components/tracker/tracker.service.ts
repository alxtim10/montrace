import { findUserByRefreshToken } from "../users/users.repository";
import { createTrackerData, findTrackerDatas } from "./tracker.repository";

export const getAllTrackerData = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);

  if (user) {
    const trackerDatas = await findTrackerDatas(user.id);
    return trackerDatas;
  } else {
    throw new Error("User not found");
  }
};

export const insertTrackerData = async (newData: any) => {
  const user = await findUserByRefreshToken(newData.refreshToken);

  if(!user) return null;
  const trackerData = await createTrackerData(newData, user.id);

  return trackerData;
};
