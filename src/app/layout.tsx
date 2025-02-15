import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/layouts/MainLayout";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "C-GEFRO",
  description: "C-GEFRO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
