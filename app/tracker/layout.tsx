import Navbar from "@/components/navigation/Navbar";
import "../globals.css";
import { Outfit } from "next/font/google";
import { Provider } from "react-redux";
import { NavigationMenuDemo } from "@/components/navigation/NavigationMenu";

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar link={"tracker"} />
      <NavigationMenuDemo />
      {children}
    </>
  );
}
