'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>({
    namaPerusahaan: '',
    deskripsi: '',
    alamat: '',
    website: '',
    bidangKerja: '',
    contactPerson: '',
    logo: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    try {
      const res = await fetch('http://localhost:5000/api/industry/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setProfile({
          namaPerusahaan: data.namaPerusahaan || '',
          deskripsi: data.deskripsi || '',
          alamat: data.alamat || '',
          website: data.website || '',
          bidangKerja: data.bidangKerja || '',
          contactPerson: data.contactPerson || '',
          logo: data.logo || ''
        });
      }
      setLoading(false);
    } catch (error) {
      router.push('/');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/industry/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        alert("✅ Profil Berhasil Diperbarui!");
        setIsEditing(false);
        fetchProfile(); 
      }
    } catch (error) {
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, logo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f6fa]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#3a57e8] border-solid"></div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 animate-in fade-in duration-700 pb-24 md:pb-10 px-4 md:px-6 lg:px-8">

      {!isEditing ? (
        <>
          {/* --- VIEW MODE: DASHBOARD PROFIL --- */}
          <section className="bg-white rounded-[40px] p-2 shadow-sm border border-gray-100 overflow-hidden relative">
            {/* Banner Blue */}
            <div className="bg-gradient-to-br from-[#3a57e8] via-[#4c6ef5] to-[#3a57e8] h-32 md:h-40 lg:h-48 rounded-[32px] md:rounded-[36px] relative overflow-hidden z-0">
              <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 opacity-20 rounded-full -ml-10 -mb-10"></div>
            </div>

            <div className="px-6 md:px-10 pb-8 relative z-10">
              <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end -mt-12 md:-mt-16 mb-6 gap-6">
                
                {/* Container Logo */}
                <div className="w-24 h-24 md:w-32 lg:w-40 bg-white p-1.5 rounded-3xl md:rounded-[40px] shadow-2xl flex items-center justify-center border border-gray-100 overflow-hidden shrink-0">
                    <div className="w-full h-full rounded-[20px] md:rounded-[32px] overflow-hidden bg-white flex items-center justify-center p-2">
                        {profile.logo ? (
                            <img
                                src={profile.logo}
                                alt={`Logo ${profile.namaPerusahaan}`}
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : (
                            <span className="text-4xl md:text-6xl opacity-20">🏢</span>
                        )}
                    </div>
                </div>

                {/* TOMBOL NEW COLOR: Soft Blue Background */}
                <div className="flex-1 flex justify-center md:justify-end w-full md:w-auto">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-3 bg-[#eef2ff] text-[#3a57e8] px-8 py-4 rounded-[22px] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-[#8598f9] hover:text-white transition-all duration-300 active:scale-95 border border-[#3a57e8]/10"
                  >
                    <span>⚙️ Pengaturan Profil</span>
                  </button>
                </div>
              </div>

              {/* Teks Nama Perusahaan */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl lg:text-5xl font-black text-[#232d42] tracking-tighter uppercase leading-tight">
                  {profile.namaPerusahaan || "Industri Baru"}
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-4">
                  <span className="bg-[#3a57e8]/10 text-[#3a57e8] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border border-[#3a57e8]/20 uppercase">
                    ● Verified Partner
                  </span>
                  <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>
                  <p className="text-gray-400 font-bold text-xs md:text-sm flex items-center gap-2">
                    <span className="text-[#3a57e8]">📍</span> {profile.alamat || "Lokasi belum diatur"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* --- CONTENT GRID --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 text-[#232d42]">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-8 bg-[#3a57e8] rounded-full shadow-lg shadow-blue-200"></div>
                  <h3 className="text-xl font-black tracking-tight uppercase text-black">Visi Kolaborasi PBL</h3>
                </div>
                <p className="text-gray-500 leading-relaxed font-bold text-sm lg:text-xl uppercase tracking-tight">
                  {profile.deskripsi || "Mari berkolaborasi menciptakan proyek nyata bersama talenta muda terbaik."}
                </p>
                
                <div className="mt-12 pt-10 border-t border-gray-50 grid grid-cols-2 gap-6">
                  <div className="bg-[#f5f6fa] p-8 rounded-[36px] text-center border border-gray-100 group hover:border-[#3a57e8]/30 transition-all cursor-default">
                    <p className="text-4xl lg:text-5xl font-black text-[#3a57e8] tracking-tighter group-hover:scale-110 transition-transform">04</p>
                    <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">Proyek Aktif</p>
                  </div>
                  <div className="bg-[#f5f6fa] p-8 rounded-[36px] text-center border border-gray-100 group hover:border-[#3a57e8]/30 transition-all cursor-default">
                    <p className="text-4xl lg:text-5xl font-black text-[#3a57e8] tracking-tighter group-hover:scale-110 transition-transform">28</p>
                    <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">Siswa Terlibat</p>
                  </div>
                </div>
              </section>

              <section className="bg-[#3a57e8] rounded-[40px] p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                <div className="text-center md:text-left relative z-10">
                  <h3 className="text-xl lg:text-2xl font-black mb-1 uppercase tracking-tight">Punya Tantangan Baru?</h3>
                  <p className="text-blue-100 text-sm font-medium opacity-80 uppercase tracking-widest text-[10px]">Unggah masalah industri untuk Proyek Nyata.</p>
                </div>
                <button
                  onClick={() => router.push('/proyek')}
                  className="w-full md:w-auto bg-white text-[#3a57e8] px-10 py-4 rounded-[20px] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-[#232d42] hover:text-white transition-all active:scale-95 relative z-10"
                >
                  Buat Proyek +
                </button>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50">
                <h3 className="text-lg font-black mb-8 tracking-tight uppercase border-b border-gray-50 pb-5 text-black">Kontak Industri</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-50 text-[#3a57e8] rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-inner">🌐</div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Website Resmi</p>
                      <a href={profile.website} target="_blank" className="text-xs font-black text-[#3a57e8] truncate block underline decoration-2 underline-offset-4">{profile.website || "BELUM DIATUR"}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-inner">📍</div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 text-black">Lokasi Kantor</p>
                      <p className="text-xs font-black text-gray-700 leading-relaxed uppercase">{profile.alamat || "BELUM DIATUR"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 text-black">
                    <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-inner">👤</div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Contact Person</p>
                      <p className="text-xs font-black text-gray-700 uppercase">{profile.contactPerson || "BELUM DIATUR"}</p>
                    </div>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </>
      ) : (
        /* --- EDIT MODE: FORM INPUT --- */
        <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-6 mb-12 pb-8 border-b border-gray-50 text-black">
            <button onClick={() => setIsEditing(false)} className="group bg-gray-100 p-4 rounded-2xl hover:bg-[#3a57e8] transition-all duration-300"> 
               <span className="group-hover:filter group-hover:invert transition-all">⬅️</span> 
            </button>
            <div>
              <h1 className="text-3xl font-black text-[#232d42] tracking-tight">EDIT PROFIL INDUSTRI</h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Perbarui identitas publik perusahaan Anda</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-8 text-black">
            <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-8 rounded-[36px] mb-10 border border-gray-100">
              <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden shrink-0 shadow-inner">
                {profile.logo ? <img src={profile.logo} className="w-full h-full object-contain p-2" alt="Logo" /> : <span className="text-4xl opacity-20">🏢</span>}
              </div>
              <div className="w-full">
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white border-2 border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-2xl hover:bg-[#3a57e8] hover:text-white hover:border-[#3a57e8] transition-all shadow-sm">
                  Ganti Logo Perusahaan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 uppercase">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-3 block ml-1">Nama Industri</label>
                <input type="text" required className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-black text-sm focus:border-[#3a57e8] focus:bg-white outline-none transition-all shadow-sm" value={profile.namaPerusahaan} onChange={(e) => setProfile({ ...profile, namaPerusahaan: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-3 block ml-1">Alamat Lengkap</label>
                <textarea rows={2} className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-black text-sm focus:border-[#3a57e8] focus:bg-white outline-none transition-all shadow-sm" value={profile.alamat} onChange={(e) => setProfile({ ...profile, alamat: e.target.value })} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-3 block ml-1">Website</label>
                <input type="url" className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-black text-sm focus:border-[#3a57e8] focus:bg-white outline-none transition-all shadow-sm" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-3 block ml-1">Contact Person</label>
                <input type="text" className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-black text-sm focus:border-[#3a57e8] focus:bg-white outline-none transition-all shadow-sm" value={profile.contactPerson} onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-3 block ml-1">Visi & Deskripsi</label>
                <textarea rows={4} className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-black text-sm focus:border-[#3a57e8] focus:bg-white outline-none transition-all shadow-sm" value={profile.deskripsi} onChange={(e) => setProfile({ ...profile, deskripsi: e.target.value })} />
              </div>
            </div>

            <button type="submit" disabled={saving} className="w-full bg-[#232d42] text-white py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#3a57e8] active:scale-[0.98] transition-all mt-8">
              {saving ? "PROSES MENYIMPAN..." : "SIMPAN PERUBAHAN PROFIL"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}