'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailProyekPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProject(data);
      }
    };
    fetchDetail();
  }, [id]);

  if (!project) return <div className="p-10 text-center font-bold">Memuat Detail...</div>;

  return (
    <div className="pt-4 pb-20 px-4 md:px-0 animate-in fade-in duration-500">
      <button 
        onClick={() => router.back()}
        className="mb-6 text-sm font-bold text-gray-500 hover:text-[#3a57e8] flex items-center gap-2"
      >
        ← Kembali ke Daftar
      </button>

      <div className="bg-white rounded-4xl p-8 md:p-12 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div>
            <span className="bg-blue-50 text-[#3a57e8] px-4 py-1.5 rounded-full text-[10px] font-black uppercase mb-4 inline-block">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#232d42] leading-tight">{project.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Proyek</p>
            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl font-black text-xs uppercase italic">
              ● {project.status}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-sm font-black text-[#232d42] uppercase tracking-widest mb-3 border-l-4 border-[#3a57e8] pl-3">Masalah Utama</h3>
              <p className="text-gray-600 leading-relaxed font-medium">{project.problemStatement}</p>
            </section>

            <section>
              <h3 className="text-sm font-black text-[#232d42] uppercase tracking-widest mb-3 border-l-4 border-[#3a57e8] pl-3">Detail Tugas</h3>
              <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-line">{project.taskDetail}</p>
            </section>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 h-fit space-y-6">
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Output Diharapkan</h4>
              <p className="font-bold text-[#232d42]">{project.expectedOutput}</p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tanggal Publikasi</h4>
              <p className="font-bold text-[#232d42]">{new Date(project.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}