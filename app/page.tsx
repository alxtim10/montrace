import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center px-2 lg:flex-row lg:min-h-screen">
        <div className="p-20 min-h-[50vh] flex flex-col justify-center w-full">
          <h1 className="text-2xl lg:text-6xl text-[#1234c4] font-bold">
            montrac.e
          </h1>
          <h1 className="text-2xl lg:text-6xl text-[#1233c4dc] font-bold">
            montrac.e
          </h1>
          <h1 className="text-2xl lg:text-6xl text-[#1233c4cc] font-bold">
            montrac.e
          </h1>
          <h1 className="text-2xl lg:text-6xl text-[#1233c4bc] font-bold">
            montrac.e
          </h1>
          <h1 className="text-2xl lg:text-6xl text-[#1233c4ac] font-bold">
            montrac.e
          </h1>
          <p className="text-lg lg:text-2xl mt-2 tracking-wider font-semibold">
            simplify your spending, amplify your savings
          </p>
        </div>
        <div className="bg-[#1234c4] min-h-[49vh] lg:min-h-[99vh] flex flex-col justify-center items-center w-full gap-5">
          <p className="text-white font-semibold tracking-widest">
            Money Tracker Electronic
          </p>
          <Link
            href="/login"
            className="text-center text-[#1234c4] font-bold bg-white w-44 py-3 border border-white hover:bg-[#1234c4] hover:border hover:border-white rounded-sm hover:text-white transition-all"
          >
            LOGIN
          </Link>
          <Link
            href="/register"
            className="text-center font-bold bg-[#1234c4] w-44 py-3 text-white border border-white hover:bg-black hover:border-black rounded-sm transition-all"
          >
            REGISTER
          </Link>
        </div>
      </section>

      <Toaster />
    </>
  );
}
