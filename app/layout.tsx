import ReactQueryProvider from "@/lib/ReactQueryProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import ReduxProvider from "@/lib/ReduxProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Montrac.e",
  description: "Money Tracker Electronic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ReduxProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
