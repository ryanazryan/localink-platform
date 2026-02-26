// app/(dashboard)/proyek/page.tsx
export default function ProyekNyataPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-[#232d42]">Proyek Nyata</h1>
        <button className="bg-[#3a57e8] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
          + Unggah Tantangan Baru
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-black text-[#232d42]">Daftar Proyek Aktif</h2>
          <span className="bg-blue-50 text-[#3a57e8] px-3 py-1 rounded-full text-[10px] font-black uppercase">
            2 Challenge Terpublikasi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Informasi Proyek</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Kategori</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* Row 1 */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-bold text-[#232d42] text-sm">Desain Poster Digital Promo Ramadan</p>
                  <p className="text-xs text-gray-400 mt-1">Toko Kue Kering Kami...</p>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">Desain Grafis</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-green-500 text-[10px] font-black flex items-center justify-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> OPEN
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="bg-blue-50 text-[#3a57e8] px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-[#3a57e8] hover:text-white transition-all">
                    Lihat Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}