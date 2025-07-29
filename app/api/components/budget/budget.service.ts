import { findUserByRefreshToken } from "../users/users.repository";
import { addBudget, findUserBudgets } from "./budget.repository";

export const getUserBudgets = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) return null;
  const data = await findUserBudgets(user.id);
  if (!data) return null;
  return data;
};

export const addNewBudget = async (newData: any) => {

  const newBudget = await addBudget(newData);
  if (!newBudget) return null;

  return newBudget;
};
