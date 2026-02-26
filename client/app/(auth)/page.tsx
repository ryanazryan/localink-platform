'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="fixed inset-0 bg-white text-[#232d42] flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
      
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* Badge Atas */}
        <span className="bg-blue-50 text-[#3a57e8] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-bounce">
          Platform Kolaborasi Industri & Sekolah
        </span>

        {/* Hero Section */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
          Project Based <br /> <span className="text-[#3a57e8]">Learning</span> Digital.
        </h1>
        
        <p className="max-w-xl text-gray-500 font-medium text-sm md:text-lg mb-10 leading-relaxed">
          Menghubungkan tantangan nyata dari Industri dengan kreativitas Siswa. 
          Bangun portofolio profesional sebelum lulus sekolah.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <Link 
            href="/login" 
            className="flex-1 bg-[#232d42] text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-blue-900/10 hover:bg-[#3a57e8] transition-all uppercase tracking-widest active:scale-95"
          >
            Masuk ke Akun
          </Link>
          <Link 
            href="/register" 
            className="flex-1 bg-white border-2 border-gray-100 text-[#232d42] py-5 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all uppercase tracking-widest active:scale-95"
          >
            Daftar Baru
          </Link>
        </div>

        {/* Footer Kecil */}
        <p className="mt-20 text-gray-400 text-[10px] font-black uppercase tracking-widest">
          Dikelola oleh Ekosistem Pendidikan Indonesia &copy; 2026
        </p>
      </div>
    </div>
  );
}