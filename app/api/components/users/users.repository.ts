import { prisma } from "@/lib/prisma";

export const findUserById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const findUserByEmail = async (email: any) => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  return user;
};

export const createUser = async (data: any) => {
  const user = await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  return user;
};

export const editToken = async (id: any, data: any) => {
  const user = await prisma.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      refreshToken: data,
    },
  });

  return user;
};

export const findUserByRefreshToken = async (data: string) => {
  const user = await prisma.users.findFirst({
    where: {
      refreshToken: data,
    },
  });

  return user;
};

export const deleteToken = async (id: number) => {
  const user = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      refreshToken: null,
    },
  });

  return user;
};

export const updatePassword = async (data: any) => {
  const user = await prisma.users.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      password: data.password,
    },
  });
  return user;
};
