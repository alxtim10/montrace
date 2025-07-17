import { findUserByRefreshToken } from "../users/users.repository";
import { findUserBudgets } from "./budget.repository";

export const getUserBudgets = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) return null;
  const data = await findUserBudgets(user.id);
  if (!data) return null;
  return data;
};
