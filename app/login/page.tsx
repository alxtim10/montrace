"use client";

import Navbar from "@/components/navigation/Navbar";
import { useFormik } from "formik";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useRefreshTokenStore } from "@/stores/useRefreshTokenStore";

export default function Home() {
  const { toast } = useToast();
  const { push } = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setRefreshToken = useRefreshTokenStore((state) => state.setRefreshToken);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      setErrorMsg("");
      setIsLoading(true);
      const { email, password } = formik.values;
      const reqBody = {
        email,
        password,
      };
      await login(reqBody);

      setIsLoading(false);
      

    },
  });

  const login = async (body: any) => {
    const asd = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const res = await asd.json();
    if (res.status == 400) {
      setErrorMsg(res.message);
      return;
    }
    setRefreshToken(res.message);
    toast({
      title: "Success",
      description: "Login Successful",
    });
    setTimeout(redirect, 1200);
  };

  const redirect = () => {
    push("/tracker");
  };

  const handleFormInput = (event: any) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const link = "";

  return (
    <section className="">
      <Navbar link={link} />
      <section className="mt-20 md:mt-28 2xl:mt-56 p-10 flex justify-center items-center">
        <div className="w-[25rem] md:w-[35rem] h-[25rem] mx-auto bg-[#e8e8e8] rounded-xl shadow-2xl">
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
          <h1 className="text-center text-3xl text-[#1234c4]">login</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="mt-10 flex flex-col justify-center items-center gap-7">
              <input
                name="email"
                className="w-full max-w-[20rem] px-6 py-3 text-black bg-white border border-gray-200 rounded-xl appearance-none placeholder:text-gray-400 focus:border-slate-400 focus:outline-none focus:ring-blue-500"
                placeholder="email"
                type="email"
                onChange={handleFormInput}
              />
              <input
                name="password"
                className="w-full max-w-[20rem] px-6 py-3 text-black bg-white border border-gray-200 rounded-xl appearance-none placeholder:text-gray-400 focus:border-slate-400 focus:outline-none focus:ring-blue-500"
                placeholder="password"
                type="password"
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
      </section>
    </section>
  );
}
