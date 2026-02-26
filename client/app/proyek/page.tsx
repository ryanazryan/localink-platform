'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  category: string;
  problemStatement: string;
  taskDetail: string;
  expectedOutput: string;
  status: string;
  createdAt: string;
}

export default function ProyekPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    category: 'IT & Software',
    problemStatement: '',
    taskDetail: '',
    expectedOutput: ''
  });

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/projects', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData) // Mengirim seluruh state termasuk category
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects([newProject, ...projects]); 
        setIsModalOpen(false); 
        setFormData({ title: '', category: 'IT & Software', problemStatement: '', taskDetail: '', expectedOutput: '' });
        alert("Proyek berhasil dipublikasikan!");
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="pt-2 space-y-4 md:space-y-8 animate-in fade-in duration-700 pb-24 md:pb-10 px-4 md:px-0">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-black">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#232d42]">Proyek Nyata</h1>
          <p className="text-gray-500 font-medium text-xs md:text-base leading-tight">
            "Selesaikan masalah industri, bangun portofolio siswa."
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-[#3a57e8] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all"
        >
          + UNGGAH TANTANGAN BARU
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-t-4xl md:rounded-4xl p-6 md:p-10 shadow-2xl animate-in slide-in-from-bottom-10 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#232d42]">Detail Tantangan Industri</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 text-3xl font-light hover:text-red-500 transition-colors">×</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-black text-left">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Judul Proyek</label>
                <input required type="text" placeholder="Contoh: Desain Kemasan Produk UMKM"
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#3a57e8]/20 font-bold text-sm"
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Kategori</label>
                  <select className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none font-bold text-sm cursor-pointer"
                    title="Pilih kategori proyek"
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>IT & Software</option>
                    <option>Desain Grafis</option>
                    <option>Pemasaran Digital</option>
                    <option>Produksi Video</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Output (Hasil Akhir)</label>
                  <input required type="text" placeholder="e.g. Website Jadi, Poster A3"
                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none font-bold text-sm"
                    value={formData.expectedOutput} onChange={(e) => setFormData({...formData, expectedOutput: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Masalah Utama</label>
                <textarea required rows={3} placeholder="Apa kesulitan yang dihadapi industri Anda saat ini?"
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none font-bold text-sm"
                  value={formData.problemStatement} onChange={(e) => setFormData({...formData, problemStatement: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Instruksi Tugas</label>
                <textarea required rows={3} placeholder="Langkah-langkah yang harus dikerjakan siswa..."
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none font-bold text-sm"
                  value={formData.taskDetail} onChange={(e) => setFormData({...formData, taskDetail: e.target.value})}
                />
              </div>

              <button type="submit" className="w-full bg-[#3a57e8] text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:brightness-110 transition-all uppercase tracking-widest">
                🚀 Publikasikan Sekarang
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl md:rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center text-black bg-white">
          <h3 className="font-black text-sm md:text-base">Daftar Proyek Aktif</h3>
          <span className="text-[10px] bg-blue-50 text-[#3a57e8] px-3 py-1 rounded-full font-black uppercase tracking-tighter">
            {projects.length} TOTAL
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-150 text-black">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Informasi Proyek</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Kategori</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-gray-400 font-bold animate-pulse uppercase tracking-widest text-xs">
                    Mengambil data...
                  </td>
                </tr>
              ) : projects.length > 0 ? (
                projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-blue-50/20 transition-all group">
                    <td className="px-6 py-5">
                      <p className="font-bold text-[#232d42] text-sm md:text-base group-hover:text-[#3a57e8] transition-colors">{proj.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-xs">{proj.problemStatement}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase">
                        {proj.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        proj.status === 'OPEN' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        ● {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Link 
                        href={`/proyek/${proj.id}`}
                        className="text-[#3a57e8] font-black text-[10px] bg-blue-50 px-4 py-2 rounded-xl hover:bg-[#3a57e8] hover:text-white transition-all uppercase"
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-24 text-center">
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Belum ada proyek.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}