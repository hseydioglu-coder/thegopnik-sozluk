import Link from 'next/link';

export default function Iletisim() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#E0E0E0] flex flex-col font-sans antialiased p-6 sm:p-12">
      <main className="max-w-3xl mx-auto w-full pt-12">
        <Link href="/" className="text-[#00ffff] hover:underline text-sm font-bold tracking-wider uppercase mb-8 inline-block">
          ← ANA SAYFA
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black text-[#C61010] mb-8 uppercase tracking-tight">
          İletişim
        </h1>
        
        <div className="bg-[#141414] border border-[#2a2a2a] p-8 rounded-2xl shadow-2xl space-y-6">
          <p className="text-base sm:text-lg text-[#c0c0c0] leading-relaxed">
            Platformumuzla ilgili geri bildirimde bulunmak, kelime önerisi yapmak veya iş birliği taleplerinizi iletmek için bizimle doğrudan e-posta adresi üzerinden iletişime geçebilirsiniz.
          </p>
          
          <div className="pt-4 border-t border-[#2a2a2a]">
            <span className="text-xs font-bold text-[#666] uppercase tracking-widest block mb-2">
              E-Posta Adresi
            </span>
            <a 
              href="mailto:info@thegopnik.com" 
              className="text-xl sm:text-2xl font-black text-[#00ffff] hover:underline tracking-wide block drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]"
            >
              info@thegopnik.com
            </a>
          </div>

          <p className="text-xs text-[#666] pt-4">
            Gönderilen tüm iletilere en geç 48 saat içerisinde dönüş yapılmaya özen gösterilmektedir.
          </p>
        </div>
      </main>
    </div>
  );
}