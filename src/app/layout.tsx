import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "APP Galeria",
  description: "APP Galeria TEST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <div className="children-items">
          {children}
        </div>
      </body>
    </html>
  );
}
