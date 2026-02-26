'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  const menu = [
    { name: 'Profil', href: '/profile', icon: '🏢' },
    { name: 'Lowongan', href: '/proyek', icon: '💼' },
    { name: 'Cari', href: '/talents', icon: '🔍' },
    { name: 'Logout', href: '/login', icon: '🚪' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      {menu.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
            <span className={`text-xl ${isActive ? 'scale-110' : 'opacity-50 grayscale'}`}>
              {item.icon}
            </span>
            <span className={`text-[9px] font-black uppercase ${isActive ? 'text-[#3a57e8]' : 'text-gray-400'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}