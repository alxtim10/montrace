import Navbar from "@/components/navigation/Navbar";
import ChangePassword from "@/components/profile/ChangePassword";

export default function Home() {
  return (
    <section className="">
      <section className="flex-col flex justify-center items-center mt-20 md:mt-28 2xl:mt-36 p-10 ">
        <ChangePassword />
      </section>
    </section>
  );
}
