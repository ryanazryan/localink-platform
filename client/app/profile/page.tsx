'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// PASTIKAN ADA KATA 'export default' DI DEPAN FUNCTION
export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Jika tidak ada token, tendang ke halaman login
    if (!token) {
      router.push('/');
      return;
    }

    // Ambil data profil dari backend
    fetch('http://localhost:5000/api/industry/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setProfile(data);
    })
    .catch(err => {
      console.error("Gagal load profil", err);
      router.push('/');
    });
  }, [router]);

  if (!profile) return <div className="p-10 text-black">Memuat data profil...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Profil Industri</h1>
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500 font-bold uppercase">Nama Perusahaan</p>
            <p className="text-lg">{profile.namaPerusahaan}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500 font-bold uppercase">Alamat</p>
            <p className="text-lg">{profile.alamat}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500 font-bold uppercase">Deskripsi</p>
            <p className="text-lg">{profile.deskripsi}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase">Website</p>
            <p className="text-lg text-blue-500">{profile.website}</p>
          </div>
        </div>

        <button 
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/');
          }}
          className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}