'use client';
import { Montserrat } from 'next/font/google';
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <html lang="en" className={montserrat.className}>
      <body className="antialiased bg-[#f5f6fa]">
        <div className="flex min-h-screen">
          {!isLoginPage && <Sidebar />}
          
          <main className={`flex-1 w-full ${!isLoginPage ? "md:ml-64 pb-20 md:pb-8" : ""}`}>
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}