import Link from 'next/link';

export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#E0E0E0] flex flex-col font-sans antialiased p-6 sm:p-12">
      <main className="max-w-3xl mx-auto w-full pt-12">
        <Link href="/" className="text-[#00ffff] hover:underline text-sm font-bold tracking-wider uppercase mb-8 inline-block">
          ← ANA SAYFA
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black text-[#C61010] mb-8 uppercase tracking-tight">
          Hakkımızda
        </h1>
        
        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#c0c0c0] font-medium">
          <p>
            <strong className="text-white">THE GOPNİK</strong>, Rus sokak kültürünün, günlük yaşam jargonunun ve sokak edebiyatının dinamik yapısını incelemek, kayıt altına almak ve Türkçeye doğru kültürel aktarımlarla kazandırmak amacıyla kurulmuş bağımsız bir dijital sözlük platformudur.
          </p>
          <p>
            Dil, yalnızca akademik kurallardan ibaret olmayan, sokakta yaşayan ve sürekli evrilen canlı bir mekanizmadır. Bu platformda, Rusça konuşulan coğrafyaların alt kültürlerinde, popüler jargonda ve sokak dilinde karşılık bulan ifadeler, kültürel arka planları ve kullanım seviyeleriyle birlikte titizlikle analiz edilir.
          </p>
          <p>
            Amacımız, dil bilimsel bir merakla bu canlı kültürü öğrenmek isteyen araştırmacılara, çevirmenlere ve dil meraklılarına sansürsüz, yalın ve gerçeğe en yakın kaynak materyali sunmaktır.
          </p>
        </div>
      </main>
    </div>
  );
}