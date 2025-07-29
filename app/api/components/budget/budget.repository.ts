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

export const addBudget = async (data: any) => {
  const budget = await prisma.budgets.create({
    data: {
      name: data.name,
      nominal: data.nominal,
      spent: data.spent,
      typeId: data.typeId,
      type_name: data.type_name,
      categoryId: data.categoryId,
      category_name: data.category_name,
      userId: data.userId
    },
  });
  return {
    ...budget,
    nominal: data.nominal.toString(),
    spent: data.spent.toString()
  };
};