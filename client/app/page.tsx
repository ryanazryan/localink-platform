'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/profile');
      } else {
        alert('Gagal: ' + data.error);
      }
    } catch (err) {
      alert('Cek Backend kamu!');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-black border border-gray-200">
        <h1 className="mb-8 text-center text-3xl font-bold text-blue-600">Localink</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="email" placeholder="Email" className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white hover:bg-blue-700 transition">Masuk</button>
        </form>
      </div>
    </div>
  );
}