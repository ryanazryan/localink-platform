'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Profil Saya', href: '/profile', icon: '🏢' },
    { name: 'Daftar Lowongan', href: '/proyek', icon: '💼' },
    { name: 'Cari Talenta', href: '/talents', icon: '🔍' },
  ];

  return (
    <div className="flex flex-col h-full p-8">
      <div className="mb-12">
        <h1 className="text-2xl font-black text-[#232d42] tracking-tighter">
          LOCAL<span className="text-[#3a57e8]">INK.</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-[20px] font-bold text-sm transition-all duration-300 ${
                isActive 
                ? 'bg-[#3a57e8] text-white shadow-xl shadow-blue-200 translate-x-2' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-[#232d42]'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
        className="mt-auto flex items-center gap-4 px-5 py-4 rounded-[20px] font-bold text-sm text-red-500 hover:bg-red-50 transition-all"
      >
        <span>🚪</span> Keluar Sesi
      </button>
    </div>
  );
}