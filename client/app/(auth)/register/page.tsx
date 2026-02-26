'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Konfigurasi Konten Berdasarkan Role
  const roleContent: any = {
    STUDENT: {
      title: "Mulai Perjalanan Profesional Anda.",
      desc: "Bangun portofolio nyata dengan mengerjakan proyek langsung dari perusahaan top.",
      features: ["Akses Proyek Industri Nyata", "Bangun Portofolio Digital", "Sertifikasi Kompetensi"],
      color: "bg-[#3a57e8]" // Biru
    },
    TEACHER: {
      title: "Modernisasi Kurikulum Kelas Anda.",
      desc: "Hubungkan siswa Anda dengan tantangan industri nyata dan pantau perkembangan mereka.",
      features: ["Manajemen Tugas Praktis", "Pantau Progress Siswa", "Akses Materi Industri"],
      color: "bg-[#0ea5e9]" // Sky Blue
    },
    INDUSTRY: {
      title: "Temukan Talenta Digital Terbaik.",
      desc: "Publikasikan tantangan bisnis Anda dan temukan calon karyawan potensial sejak dini.",
      features: ["Posting Proyek & Lowongan", "Review Hasil Kerja Siswa", "Efisiensi Rekrutmen"],
      color: "bg-[#232d42]" // Navy Dark
    }
  };

  const currentContent = roleContent[formData.role];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Registrasi Berhasil! Silakan Login.");
        router.push('/login');
      } else {
        const err = await res.json();
        alert(err.message || "Gagal mendaftar");
      }
    } catch (error) {
      alert("Gagal terhubung ke server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-50 p-0 md:p-6 text-black">
      <div className="bg-white w-full max-w-6xl md:rounded-[40px] shadow-2xl shadow-blue-200/20 border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-175 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* SISI KIRI: Branding Dinamis */}
        <div className={`hidden md:flex md:w-5/12 ${currentContent.color} p-12 flex-col justify-between relative overflow-hidden transition-all duration-500`}>
          <div className="relative z-10">
            <Link href="/" className="inline-block bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-8 hover:bg-white/30 transition-all">
              <span className="text-white font-black tracking-tighter text-xl">PBL.</span>
            </Link>
            <h2 className="text-4xl font-black text-white leading-tight mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
              {currentContent.title}
            </h2>
            <ul className="space-y-4">
              {currentContent.features.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-blue-50 font-medium text-sm animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✔</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10">
            <p className="text-blue-50 text-xs font-medium leading-relaxed italic">
              {currentContent.desc}
            </p>
          </div>

          {/* Efek Cahaya Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        </div>

        {/* SISI KANAN: Form Register */}
        <div className="w-full md:w-7/12 p-8 md:p-16 bg-white overflow-y-auto">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-black text-[#232d42] tracking-tight mb-2">Daftar Akun Baru</h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Pilih peran Anda untuk menyesuaikan fitur</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Selector Role yang Lebih Modern */}
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-4 ml-1">Saya ingin bergabung sebagai:</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'STUDENT', label: 'SISWA', icon: '🎓', active: 'border-[#3a57e8] bg-blue-50 text-[#3a57e8]' },
                  { id: 'TEACHER', label: 'GURU', icon: '👨‍🏫', active: 'border-[#0ea5e9] bg-sky-50 text-[#0ea5e9]' },
                  { id: 'INDUSTRY', label: 'INDUSTRI', icon: '🏢', active: 'border-[#232d42] bg-gray-100 text-[#232d42]' }
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: r.id })}
                    className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all gap-2 ${
                      formData.role === r.id ? r.active : 'border-gray-100 bg-white text-gray-300 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Nama Lengkap</label>
                <input required type="text" placeholder="John Doe" 
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#3a57e8] font-bold text-sm transition-all"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Alamat Email</label>
                <input required type="email" placeholder="name@email.com" 
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#3a57e8] font-bold text-sm transition-all"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Password</label>
              <input required type="password" placeholder="Min. 8 karakter" 
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#3a57e8] font-bold text-sm transition-all"
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full ${currentContent.color} text-white py-5 rounded-2xl font-black text-sm shadow-xl hover:opacity-90 active:scale-[0.98] transition-all uppercase tracking-[0.2em] mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : `Gabung Sebagai ${formData.role}`}
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                SUDAH PUNYA AKUN? <Link href="/login" className="text-[#3a57e8] hover:underline decoration-2 underline-offset-4">LOGIN DISINI</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}