import Link from 'next/link';

export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#E0E0E0] flex flex-col font-sans antialiased p-6 sm:p-12">
      <main className="max-w-4xl mx-auto w-full pt-12 pb-16">
        <Link href="/" className="text-[#00ffff] hover:underline text-sm font-bold tracking-wider uppercase mb-8 inline-block">
          ← ANA SAYFA
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black text-[#C61010] mb-12 uppercase tracking-tight border-b border-[#2a2a2a] pb-4">
          Hakkımızda: Rus Leksikografisinde Sosyolinguistik Bir İnceleme
        </h1>
        
        <article className="space-y-8 text-base sm:text-lg leading-relaxed text-[#c0c0c0] text-justify">
          
          {/* Özet Kısmı */}
          <section>
            <h2 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">1. Özet ve Giriş</h2>
            <p className="mb-4">
              Dil, durağan bir yapıdan ziyade sosyokültürel dinamiklerle sürekli evrilen canlı bir organizmadır. Geleneksel sözlük bilimi (leksikografi), genellikle standart ve kuralsal (preskriptif) dili kayıt altına alma eğilimindeyken; toplumun alt katmanlarında, sokak kültüründe ve günlük gayriresmî iletişimde filizlenen halk ağzı, argo ve jargon çoğu zaman akademik çalışmaların çeperinde bırakılmaktadır. 
            </p>
            <p>
              <strong className="text-white font-black">THE GOPNİK</strong>, Rusçanın bu göz ardı edilen, ancak sosyolinguistik ve pragmatik açıdan büyük önem taşıyan katmanını mercek altına alan, açık kaynaklı dijital bir derlem ve araştırma platformudur.
            </p>
          </section>

          {/* Kavramsal Çerçeve */}
          <section>
            <h2 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">2. Kavramsal Çerçeve: Rus Sokak Dili ve "Mat"</h2>
            <p className="mb-4">
              Rus dil biliminde standart dışı leksikoloji, özellikle "mat" (küfürlü dil) ve sokak jargonu, tarihsel süreçte kendine has bir morfolojik üretkenlik ve semantik derinlik kazanmıştır. Ön eklerin (pristavka) ve son eklerin yoğun kullanımıyla şekillenen bu dil katmanı, yalnızca bir öfke dışavurumu değil; aynı zamanda aidiyet, hiyerarşi, ironi ve alt kültür kimliğinin inşasında kullanılan karmaşık bir göstergebilimsel sistemdir.
            </p>
            <p>
              Platformumuz, bu yapıların kültürel arka planlarını reddetmek yerine, onları birer dil bilimsel veri (corpus) olarak kabul eder ve nesnel bir analitik düzlemde inceler.
            </p>
          </section>

          {/* Metodoloji */}
          <section>
            <h2 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">3. Metodolojik Yaklaşım ve Çeviri İlkeleri</h2>
            <p className="mb-4">
              Bu veri tabanında yer alan her bir leksikal birim rastgele seçilmemiş; etimolojik kökeni, anlamsal evrimi ve kullanıldığı kültürel bağlam göz önünde bulundurularak sınıflandırılmıştır. Platformun metodolojik temelini şu unsurlar oluşturur:
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-4 text-[#a0a0a0]">
              <li><strong className="text-[#00ffff]">Kültürel Bağlamsallaştırma:</strong> Kelimelerin yalnızca sözlük anlamları değil, hangi sosyolojik durumlarda (pragmatik işlev) kullanıldığı detaylandırılır.</li>
              <li><strong className="text-[#00ffff]">Standartlara Tam Uyum:</strong> Rusça halk ağzına ait gayriresmî ifadelerin Türkçeye aktarımında kavramsal doğruluk hedeflenirken, tüm çevirilerin ve metinsel açıklamaların Türk Dil Kurumu (TDK) yazım ve noktalama kurallarına eksiksiz bir şekilde uyması temel standart olarak benimsenmiştir.</li>
              <li><strong className="text-[#00ffff]">Derecelendirme Sistemi:</strong> İfadeler, taşıdıkları şiddet ve tabu seviyelerine göre tasnif edilerek araştırmacılara objektif bir metrik sunulur.</li>
            </ul>
          </section>

          {/* Amaç ve Kapsam */}
          <section>
            <h2 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">4. Araştırmanın Amacı ve Hedef Kitle</h2>
            <p>
              THE GOPNİK projesinin nihai amacı; sansür mekanizmalarının dilde yarattığı veri kaybını önlemek ve sokak edebiyatının filtresiz doğasını akademik bir ciddiyetle belgelemektir. Bu platform, yalnızca pratik bir çeviri aracı olmayıp; çevirmenler, Slavistik araştırmacıları, edebiyat bilimciler, dil kurgusu yapan yazarlar ve iki farklı toplumun sokak kültürleri arasındaki sosyolojik bağları incelemek isteyen uzmanlar için tasarlanmış kapsamlı bir referans kaynağıdır.
            </p>
          </section>

        </article>
      </main>
    </div>
  );
}