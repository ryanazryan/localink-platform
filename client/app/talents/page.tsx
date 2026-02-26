'use client';
import { useState } from 'react';

export default function TalentsPage() {
  const [talents] = useState([
    { id: 1, name: "Ahmad Fikri", school: "SMKN 1 Jakarta", skill: "Fullstack Dev", status: "Ready for Project" },
    { id: 2, name: "Siti Aminah", school: "SMKN 2 Bandung", skill: "UI/UX Designer", status: "In Project" },
  ]);

  return (
    <div className="pt-2 space-y-4 md:space-y-8 animate-in fade-in duration-700 pb-24 md:pb-10 px-4 md:px-0">
      
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#232d42] tracking-tight">Eksplorasi Talenta</h1>
        <p className="text-gray-500 font-medium text-xs md:text-base leading-tight">Temukan siswa terbaik untuk mengerjakan Proyek Nyata Anda.</p>
      </div>

      <div className="space-y-3">
        <input 
          type="text" 
          placeholder="Cari keahlian (contoh: React, Figma, Laravel)..." 
          className="w-full bg-white border border-gray-100 px-6 py-4 rounded-2xl outline-none font-medium text-sm shadow-sm text-black"
        />
        <button className="w-full bg-white border border-gray-100 py-4 rounded-2xl font-bold text-gray-600 text-sm shadow-sm">
          Filter Keahlian
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {talents.map((student) => (
          <div key={student.id} className="bg-white rounded-4xl p-6 border border-gray-50 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-xl border border-blue-100">👨‍🎓</div>
              <div>
                <h3 className="font-black text-[#232d42] text-sm">{student.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{student.school}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-[10px]">
              <div className="flex justify-between font-black uppercase tracking-widest text-gray-400">
                <span>Keahlian Utama</span>
                <span className="text-[#3a57e8]">{student.skill}</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#3a57e8] h-full w-[80%]"></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <span className={`text-[9px] font-black px-3 py-1 rounded-lg ${
                student.status === 'Ready for Project' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {student.status}
              </span>
              <button className="text-[#3a57e8] font-black text-[10px] uppercase tracking-tighter">Lihat Portofolio</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}