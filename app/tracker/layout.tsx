"use client"

import Navbar from "@/components/navigation/Navbar";
import "../globals.css";
import { Outfit } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/utils/store/store";

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
          {children}
        </Provider>
      </body>
    </html>
  );
}
