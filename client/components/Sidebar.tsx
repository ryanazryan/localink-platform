'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Profil', href: '/profile', icon: '🏢' },
    { name: 'Lowongan', href: '/proyek', icon: '💼' },
    { name: 'Cari', href: '/talents', icon: '🔍' },
  ];

  return (
    <>
      {/* Desktop Sidebar (md+) */}
      <aside className="hidden md:flex flex-col w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 z-50">
        <div className="p-8">
          <h2 className="text-2xl font-black text-[#3a57e8] tracking-tight text-black">Localink</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} 
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-200 ${
                  isActive ? "bg-[#3a57e8] text-white shadow-lg shadow-blue-100" : "text-gray-500 hover:bg-blue-50"
                }`}>
                <span className="text-xl">{item.icon}</span>
                <span className="font-bold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-gray-50">
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            className="flex items-center gap-3 w-full px-5 py-3 text-gray-400 hover:text-red-600 font-bold text-sm">
            <span>🚪 Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav (Logo Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} 
              className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all ${
                isActive ? "bg-blue-50 text-[#3a57e8] scale-110" : "text-gray-400"
              }`}>
              <span className="text-2xl">{item.icon}</span>
            </Link>
          );
        })}
        <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          className="flex items-center justify-center w-12 h-12 text-gray-400">
          <span className="text-2xl">🚪</span>
        </button>
      </nav>
    </>
  );
}