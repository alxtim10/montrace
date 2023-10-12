import { prisma } from "@/lib/prisma";

export const findTrackerDatas = async (id: number) => {
  const trackerDatas = await prisma.trackerData.findMany({
    where: {
      userId: id,
    },
  });

  return trackerDatas;
};

export const createTrackerData = async (data: any, id?: number) => {
  console.log(data.date);
  const trackerData = await prisma.trackerData.create({
    data: {
      date: data.date,
      name: data.name,
      nominal: parseInt(data.nominal),
      type: data.type,
      category: data.category,
      user: {
        connect: { id: id },
      },
    },
  });
  return trackerData;
};
