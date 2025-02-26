"use client";

import "./globals.css";
import { MainLayout } from "@/layouts/MainLayout";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const excludedRoutes = ['/auth/signin', '/auth/signup'];

  const isExcluded = excludedRoutes.includes(pathname);

  return (
    <html lang="pt-br">
      <head>
        <title>C-GEFRO</title>
      </head>
      <body>
        {isExcluded ? (
          children
        ) : (
          <div>
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </div>
        )}
      </body>
    </html>
  );
}
