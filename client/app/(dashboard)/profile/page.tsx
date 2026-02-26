'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    fetch('http://localhost:5000/api/industry/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => { 
      setProfile(data); 
      setLoading(false); 
    })
    .catch(() => router.push('/'));
  }, [router]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f6fa]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#3a57e8] border-solid"></div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 animate-in fade-in duration-700 pb-24 md:pb-10 px-4 md:px-6 lg:px-8">
      
      {/* SECTION 1: HEADER DASHBOARD */}
      <section className="bg-white rounded-4xl p-2 shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-[#3a57e8] to-[#4c6ef5] h-32 md:h-40 lg:h-48 rounded-3xl md:rounded-4xl relative p-6 md:p-10 flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white opacity-10 rounded-full -mr-10 -mt-10 md:-mr-20 md:-mt-20"></div>
        </div>
        
        <div className="px-4 md:px-10 pb-6 md:pb-8">
          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end -mt-10 md:-mt-16 mb-4 md:mb-6 gap-4">
            <div className="w-24 h-24 md:w-32 lg:w-40 bg-white p-2 rounded-4xl shadow-xl flex items-center justify-center text-4xl md:text-6xl lg:text-7xl border border-gray-50">
               🏢
            </div>
            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-[#3a57e8] text-white px-6 lg:px-10 py-3 lg:py-4 rounded-2xl font-black text-xs lg:text-sm shadow-lg shadow-blue-200 hover:scale-105 active:scale-95 transition-all tracking-wide">
                Pengaturan Profil
              </button>
            </div>
          </div>
          
          <div className="mt-2 text-center md:text-left">
            <h2 className="text-2xl lg:text-4xl font-black text-[#232d42] tracking-tighter">
              {profile.namaPerusahaan}
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-3 mt-3">
               <span className="bg-[#3a57e8]/10 text-[#3a57e8] px-3 py-1 rounded-xl text-[9px] md:text-[10px] font-black tracking-widest border border-[#3a57e8]/20">
                  ● Verified Partner
               </span>
               <p className="text-gray-400 font-bold text-xs md:text-sm flex items-center gap-1">
                  📍 {profile.alamat}
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GRID LAYOUT (Optimized for iPad) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 text-[#232d42]">
        <div className="md:col-span-2 space-y-4 lg:space-y-8">
          <section className="bg-white rounded-4xl p-6 lg:p-10 shadow-sm border border-gray-50">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <div className="w-1.5 h-6 lg:w-2 lg:h-8 bg-[#3a57e8] rounded-full"></div>
              <h3 className="text-lg lg:text-2xl font-black tracking-tight">Visi Kolaborasi PBL</h3>
            </div>
            <p className="text-gray-500 leading-relaxed font-medium text-sm lg:text-lg">
              "{profile.deskripsi || "Mari berkolaborasi menciptakan proyek nyata."}"
            </p>
            
            <div className="mt-6 lg:mt-10 pt-6 lg:pt-10 border-t border-gray-50 grid grid-cols-2 gap-3 lg:gap-4">
              <div className="bg-[#f5f6fa] p-4 lg:p-8 rounded-4xl text-center border border-gray-100">
                 <p className="text-2xl lg:text-4xl font-black text-[#3a57e8] tracking-tighter">04</p>
                 <p className="text-[9px] lg:text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">Proyek Aktif</p>
              </div>
              <div className="bg-[#f5f6fa] p-4 lg:p-8 rounded-4xl text-center border border-gray-100">
                 <p className="text-2xl lg:text-4xl font-black text-[#3a57e8] tracking-tighter">28</p>
                 <p className="text-[9px] lg:text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">Siswa Terlibat</p>
              </div>
            </div>
          </section>

          <section className="bg-[#3a57e8] rounded-4xl p-6 lg:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-blue-100">
            <div className="text-center md:text-left">
              <h3 className="text-lg lg:text-xl font-black mb-1">Punya Tantangan Baru?</h3>
              <p className="text-blue-100 text-xs md:text-sm font-medium">Unggah masalah industri untuk Proyek Nyata.</p>
            </div>
            <button className="w-full md:w-auto bg-white text-[#3a57e8] px-8 py-3 rounded-xl font-black text-xs md:text-sm uppercase whitespace-nowrap">
              Buat Proyek +
            </button>
          </section>
        </div>

        {/* Sidebar Info - Di iPad dia akan otomatis pindah ke baris baru tapi mengambil 2 kolom jika diatur, 
            namun lebih rapi jika tetap mengikuti flow grid-cols-2. */}
        <aside className="md:col-span-2 lg:col-span-1 space-y-4 lg:space-y-6">
          <section className="bg-white rounded-4xl p-6 lg:p-8 shadow-sm border border-gray-50 h-full">
            <h3 className="text-base lg:text-lg font-black mb-6 tracking-tight uppercase">Kontak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="flex items-center gap-4">
                 <div className="w-10 lg:w-12 h-10 lg:h-12 bg-blue-50 text-[#3a57e8] rounded-2xl flex items-center justify-center text-lg shrink-0">🌐</div>
                 <div className="overflow-hidden">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Website</p>
                    <a href={profile.website} target="_blank" className="text-xs lg:text-sm font-bold text-[#3a57e8] truncate block underline">{profile.website || "localink.id"}</a>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 lg:w-12 h-10 lg:h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-lg shrink-0">📍</div>
                 <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Lokasi</p>
                    <p className="text-xs lg:text-sm font-bold text-gray-700 leading-tight">{profile.alamat}</p>
                 </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}