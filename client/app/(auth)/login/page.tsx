'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('userName', data.user.name);

        if (data.user.role === 'INDUSTRY') {
          router.push('/proyek');
        } else if (data.user.role === 'TEACHER') {
          router.push('/guru/proyek');
        } else {
          router.push('/siswa/dashboard');
        }
      } else {
        alert(data.message || "Email atau Password salah!");
      }
    } catch (error) {
      alert("Gagal terhubung ke server. Pastikan backend menyala.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-50 p-0 md:p-6 text-black">
      <div className="bg-white w-full max-w-5xl md:rounded-[40px] shadow-2xl shadow-blue-200/20 border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-150 animate-in fade-in zoom-in duration-700">
        <div className="hidden md:flex md:w-1/2 bg-[#232d42] p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <span className="text-xl">🚀</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              Bangun Masa Depan <br /> <span className="text-[#3a57e8]">Digital</span> Anda.
            </h2>
            <p className="text-gray-400 font-medium">
              Platform kolaborasi antara Industri dan Sekolah untuk menciptakan talenta digital berkualitas tinggi.
            </p>
          </div>

          <div className="relative z-10 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
            <p className="text-white font-bold text-sm mb-1">"Problem-based learning adalah kunci."</p>
            <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Digital PBL Ecosystem</p>
          </div>

          {/* Ornamen Dekoratif Background */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#3a57e8] rounded-full blur-[120px] opacity-20"></div>
        </div>

        {/* SISI KANAN: Form Login */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-[#232d42] tracking-tight mb-2">Selamat Datang</h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Masuk untuk melanjutkan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2 ml-1">Email Komunitas</label>
              <input 
                required 
                type="email" 
                placeholder="nama@email.com" 
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-[#3a57e8]/10 focus:border-[#3a57e8] font-bold text-sm transition-all"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Password</label>
                <Link href="#" className="text-[10px] font-black text-[#3a57e8] hover:underline uppercase tracking-tighter">Lupa?</Link>
              </div>
              <input 
                required 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-[#3a57e8]/10 focus:border-[#3a57e8] font-bold text-sm transition-all"
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-[#232d42] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-900/10 hover:bg-[#3a57e8] active:scale-[0.98] transition-all uppercase tracking-widest mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Masuk Sekarang'}
            </button>

            <div className="pt-8 border-t border-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest text-center">Belum Punya Akun?</span>
                <Link 
                  href="/register" 
                  className="text-[#3a57e8] font-black text-[10px] hover:underline uppercase tracking-widest"
                >
                  Daftar Akun Baru
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}