import type { Metadata } from "next";
import { Kaisei_Decol } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const kaiseiDecol = Kaisei_Decol({
  variable: "--font-kaisei-decol",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SimShare",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kaiseiDecol.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
