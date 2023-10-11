"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useChangePassword } from "@/features/account/useChangePassword";
import { useToast } from "../ui/use-toast";
import { useGetUser } from "@/features/account/useGetUser";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    onSubmit: async () => {
      setIsLoading(true);
      const { password, newPassword } = formik.values;

      changePassword({
        userId,
        password,
        newPassword,
      });

      formik.setFieldValue("password", "");
      formik.setFieldValue("newPassword", "");
    },
  });

  const { data, refetch: fetchUser } = useGetUser({
    onSuccess: (datas: any) => {
      setUsername(datas.name);
      setEmail(datas.email);
      setUserId(datas.id);
    },
    onError: () => {},
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const { mutate: changePassword } = useChangePassword({
    onError: (error: any) => {
      setErrorMsg(error);

      setIsLoading(false);
    },
    onSuccess: (res: any) => {
      setErrorMsg("");
      toast({
        title: res,
        description: "Password Changed",
      });

      setIsLoading(false);
    },
  });

  const handleFormInput = (event: any) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <>
      <section className=" flex flex-col justify-center items-center">
        <h1 className="text-3xl">{username}</h1>
        <h1 className="text-lg">{email}</h1>
      </section>
      <div className="mt-5 w-[25rem] md:w-[35rem] h-[25rem] mx-auto bg-[#e8e8e8] rounded-xl shadow-2xl">
        <div className="flex items-center p-3">
          <div className="px-1">
            <span className="w-4 h-4 rounded-full inline-block bg-red-500 cursor-pointer"></span>
          </div>
          <div className="px-1">
            <span className="w-4 h-4 rounded-full inline-block bg-yellow-400 cursor-pointer"></span>
          </div>
          <div className="px-1">
            <span className="w-4 h-4 rounded-full inline-block bg-green-500 cursor-pointer"></span>
          </div>
        </div>
        <h1 className="text-center text-3xl text-[#1234c4]">change password</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-10 flex flex-col justify-center items-center gap-7">
            <input
              name="password"
              className="w-full max-w-[20rem] px-6 py-3 text-black bg-white border border-gray-200 rounded-xl appearance-none placeholder:text-gray-400 focus:border-slate-400 focus:outline-none focus:ring-blue-500"
              placeholder="Current Password"
              type="password"
              value={formik.values.password}
              onChange={handleFormInput}
            />
            <input
              name="newPassword"
              className="w-full max-w-[20rem] px-6 py-3 text-black bg-white border border-gray-200 rounded-xl appearance-none placeholder:text-gray-400 focus:border-slate-400 focus:outline-none focus:ring-blue-500"
              placeholder="New Password"
              type="password"
              value={formik.values.newPassword}
              onChange={handleFormInput}
            />
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="mt-5 text-center text-[#1234c4] font-bold bg-transparent w-44 py-3 border border-[#1234c4] hover:bg-[#1234c4] hover:border hover:border-white rounded-sm hover:text-white transition-all"
            >
              {isLoading ? "loading..." : "submit"}
            </button>
          </div>
        </form>
        {errorMsg != "" ? (
          <div className="flex justify-center items-center">
            <div className="w-96 mt-20">
              <Alert variant="destructive">
                <AlertTitle>ERROR</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ChangePassword;
