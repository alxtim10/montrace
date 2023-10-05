import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-2 lg:flex-row lg:min-h-screen">
      <div className="p-20 min-h-[50vh] flex flex-col justify-center w-full">
        <h1 className="text-4xl lg:text-6xl text-[#1234c4] font-bold">montrac.e</h1>
        <h1 className="text-4xl lg:text-6xl text-[#1233c4dc] font-bold">montrac.e</h1>
        <h1 className="text-4xl lg:text-6xl text-[#1233c4cc] font-bold">montrac.e</h1>
        <h1 className="text-4xl lg:text-6xl text-[#1233c4bc] font-bold">montrac.e</h1>
        <h1 className="text-4xl lg:text-6xl text-[#1233c4ac] font-bold">montrac.e</h1>
        <p className="text-xl lg:text-2xl mt-2 tracking-wider font-semibold">Simplify Your Spending, Amplify Your Savings</p>
      </div>
      <div className="bg-[#1234c4] min-h-[49vh] lg:min-h-[99vh] flex flex-col justify-center items-center w-full gap-5">
        <p className="text-white font-semibold tracking-widest">Money Tracker Electronic</p>
        <button className="text-[#1234c4] font-bold bg-white w-44 py-3 border border-white hover:bg-[#1234c4] hover:border hover:border-white rounded-sm hover:text-white transition-all">LOGIN</button>
        <button className="font-bold bg-[#1234c4] w-44 py-3 text-white border border-white hover:bg-black hover:border-black rounded-sm transition-all">REGISTER</button>
        <Link href="/tracker" className="text-white hover:underline cursor-pointer">Guest</Link>
      </div>
    </main>
  );
}
