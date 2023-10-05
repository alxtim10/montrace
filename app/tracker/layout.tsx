"use client";

import Navbar from "@/components/navigation/Navbar";
import "../globals.css";
import { Outfit } from "next/font/google";
import { Provider } from "react-redux";
import { NavigationMenuDemo } from "@/components/navigation/NavigationMenu";
import { store } from "@/stores/store";

const outfit = Outfit({ subsets: ["latin"] });

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Provider store={store}>
          <Navbar />
          <NavigationMenuDemo />
          {children}
        </Provider>
      </body>
    </html>
  );
}
