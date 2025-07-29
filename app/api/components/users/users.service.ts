import {
  createUser,
  deleteToken,
  editToken,
  findUserByEmail,
  findUserById,
  findUserByRefreshToken,
  updatePassword,
} from "./users.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { findTrackerDatas } from "../tracker/tracker.repository";

dotenv.config();


export const registerUser = async (newData: any) => {
  if (newData.email == "" || newData.email == "" || newData.email == "")
    throw new Error("Missing fields.");
  const existingUser = await findUserByEmail(newData.email);

  if (existingUser) {
    throw new Error("Email already registered.");
  }


  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(newData.password, salt);
  newData.password = hashPassword;
  const user = await createUser(newData);
  const { id: userId, name, email } = user;
  const accessToken = jwt.sign({ userId, name, email }, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  const refreshToken = jwt.sign(
    { userId, name, email },
    process.env.NEXT_PUBLIC_REFERSH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const tokenData = {
    accessToken,
    refreshToken,
  };

  return tokenData;
};

export const loginUser = async (loginData: any) => {
  const user = await findUserByEmail(loginData.email);
  if (!user) throw new Error("Wrong credentials - No Email");
  const match = await bcrypt.compare(loginData.password, user.password);
  if (!match) throw new Error("Wrong credentials - Wrong Password");

  const { id: userId, name, email } = user;
  const accessToken = jwt.sign(
    { userId, name, email },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "20s",
    }
  );
  const refreshToken = jwt.sign(
    { userId, name, email },
    process.env.NEXT_PUBLIC_REFERSH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  await editToken(userId, refreshToken);

  const tokenData = {
    accessToken,
    refreshToken,
    userId
  };

  return tokenData;
};

export const logoutUser = async (cookieRefreshToken: any) => {
  if (!cookieRefreshToken) throw new Error("Bad Request");
  const existingUser = await findUserByRefreshToken(cookieRefreshToken);
  if (!existingUser) throw new Error("Bad Request");

  await deleteToken(existingUser.id);

  return;
};

export const changePassword = async (newData: any) => {
  const user = await findUserByRefreshToken(newData.refreshToken);
  if (!user) throw new Error("Wrong credentials");
  const match = await bcrypt.compare(newData.password, user.password);
  if (!match) throw new Error("Wrong password");

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(newData.newPassword, salt);
  newData.password = hashPassword;
  const updateData = {
    id: user.id,
    password: hashPassword,
  };
  const newUser = await updatePassword(updateData);

  return newUser;
};

export const getUser = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);
  let trackerDatas;
  if (user) {
    trackerDatas = await findTrackerDatas(user?.id);
  }

  if (user) {
    return {
      user: user,
      tracker: trackerDatas 
    };
  } else {
    throw new Error("User not found");
  }
};
