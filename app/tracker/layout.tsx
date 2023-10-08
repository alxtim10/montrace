
import Navbar from "@/components/navigation/Navbar";
import "../globals.css";
import { Outfit } from "next/font/google";
import { Provider } from "react-redux";
import { NavigationMenuDemo } from "@/components/navigation/NavigationMenu";
import { store } from "@/stores/store";

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <NavigationMenuDemo />
      {children}
    </>
  );
}
