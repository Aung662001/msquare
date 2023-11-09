"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme_provider";
import { Toaster } from "react-hot-toast";
import Providers from "./Provider";
import { SessionProvider } from "next-auth/react";
import { ReactNode, FC } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader";
import { CircularProgress } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} 
        ${josefin.variable}
       !bg-white dark:bg-gradient-to-b
        dark:from-gray-900 
        dark:to-black 
        duration-300
        bg-no-repeat
      `}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {/* <Custom>{children}</Custom> */}
              {children}
              <Toaster position="top-center" />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

