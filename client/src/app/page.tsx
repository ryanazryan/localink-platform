'use client';
import { useState } from 'react';
import axiosInstance from '@/lib/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login Berhasil! Token sudah disimpan.');
    } catch (error: any) {
      alert('Login Gagal: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Login Localink</h1>
        <input 
          type="email" placeholder="Email" 
          className="w-full p-2 mb-4 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-4 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}