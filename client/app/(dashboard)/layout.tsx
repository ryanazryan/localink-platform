'use client';
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar untuk Desktop (Layar Lebar) */}
      <aside className="hidden md:block w-72 h-screen sticky top-0 border-r border-gray-200 bg-white">
        <Sidebar />
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-6 pb-24 md:pb-6 overflow-y-auto text-black">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Navigasi Khusus Mobile (Layar Kecil) */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}