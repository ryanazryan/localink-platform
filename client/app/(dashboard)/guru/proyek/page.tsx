'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuruProyekMarketplace() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllProjects = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/projects/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <div className="p-8 space-y-8 text-black bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-black text-[#232d42]">Eksplorasi Proyek Industri</h1>
        <p className="text-gray-500 font-medium">Pilih tantangan nyata untuk diimplementasikan ke dalam kurikulum kelas Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="font-bold text-gray-400 animate-pulse">Memuat database proyek...</p>
        ) : projects.length > 0 ? (
          projects.map((proj: any) => (
            <div key={proj.id} className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-[#3a57e8] px-3 py-1 rounded-xl text-[10px] font-black uppercase">
                  {proj.category || 'Umum'}
                </span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                   {proj.industry?.name || 'Anonim'}
                </p>
              </div>
              
              <h3 className="text-lg font-black text-[#232d42] group-hover:text-[#3a57e8] mb-2">{proj.title}</h3>
              <p className="text-gray-500 text-xs font-medium line-clamp-3 mb-6 leading-relaxed">
                {proj.problemStatement}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <Link href={`/guru/proyek/${proj.id}`} className="text-[#3a57e8] font-black text-xs hover:underline uppercase">
                  Lihat Detail
                </Link>
                <button className="bg-[#232d42] text-white px-4 py-2 rounded-xl text-[10px] font-black hover:bg-[#3a57e8] transition-all uppercase">
                  Tugaskan Proyek
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 font-bold">Belum ada proyek industri yang tersedia.</p>
        )}
      </div>
    </div>
  );
}