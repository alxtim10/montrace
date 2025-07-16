import { TrackerType } from "@/interface/tracker";
import { prisma } from "@/lib/prisma";
import { findUserById } from "../users/users.repository";

export const findTrackerDatas = async (id: number) => {
  const trackerDatas = await prisma.trackerData.findMany({
    where: {
      userId: id,
    },
  });
  
  const safeTrackerDatas = trackerDatas.map((item) => ({
    ...item,
    nominal: item.nominal.toString(), // 👈 convert BigInt to string
  }));
  
  return safeTrackerDatas;
};

export const createTrackerData = async (data: TrackerType, id: number) => {
  console.log(data);
  const type = await prisma.types.findFirst({
    where: {
      id: data.type,
    },
  })
  const category = await prisma.categories.findFirst({
    where: {
      id: data.category,
    },
  })
  let trackerData;
  if (type && category) {
    trackerData = await prisma.trackerData.create({
      data: {
        date: data.date,
        name: data.name,
        nominal: data.nominal,
        type_name: type.name,
        category_name: category.name,
        type: {
          connect: { id: data.type },
        },
        category: {
          connect: { id: data.category },
        },
        user: {
          connect: { id: id },
        },
      },
    });

    let expense = 0;
    let saving = 0;
    if (data.type === 1) {
      expense = data.nominal;
    } else {
      saving = data.nominal;
    }

    const user = await findUserById(id);
    if (user && user.balance && user.saving && user.expense) {
      await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          balance: data.type === 1 ? parseInt(user.balance) - data.nominal : parseInt(user.balance) + data.nominal,
          saving: Number(user.saving) + Number(saving),
          expense: Number(user.expense) + Number(expense)
        },
      });
    }
  }
  return {
    ...trackerData,
    nominal: trackerData?.nominal.toString()
  };
};
