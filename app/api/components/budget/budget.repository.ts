import { prisma } from "@/lib/prisma";

export const findUserBudgets = async (id: number) => {
  const budgets = await prisma.budgets.findMany({
    where: {
      userId: id,
    },
  });
  
  const finalBudgets = budgets.map((item) => ({
    ...item,
    nominal: item.nominal.toString(),
    spent: item.spent.toString(),
  }));
  
  return finalBudgets;
};