import Link from 'next/link';

export default function GizlilikPolitikasi() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#E0E0E0] flex flex-col font-sans antialiased p-6 sm:p-12">
      <main className="max-w-3xl mx-auto w-full pt-12 pb-16">
        <Link href="/" className="text-[#00ffff] hover:underline text-sm font-bold tracking-wider uppercase mb-8 inline-block">
          ← ANA SAYFA
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black text-[#C61010] mb-8 uppercase tracking-tight">
          Gizlilik Politikası
        </h1>
        
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#c0c0c0]">
          <p>
            Bu gizlilik politikası, <strong className="text-white">thegopnik.com</strong> internet sitesi üzerinden toplanan bilgilerin ne şekilde kullanıldığını, korunduğunu ve paylaşıldığını açıklamaktadır.
          </p>
          
          <h2 className="text-lg font-bold text-white uppercase mt-6 border-b border-[#2a2a2a] pb-2">
            Log Dosyaları
          </h2>
          <p>
            Birçok standart web sunucusunda olduğu gibi thegopnik.com da istatistiksel amaçlı log dosyaları kaydetmektedir. Bu dosyalar; IP adresiniz, tarayıcı türünüz, internet servis sağlayıcınız, siteye giriş-çıkış sayfalarınız ve tıklama sayınız gibi standart bilgileri içerir. Bu veriler şahsi bilgilerinizle ilişkilendirilmez ve yalnızca site performans analizi amacıyla kullanılır.
          </p>

          <h2 className="text-lg font-bold text-white uppercase mt-6 border-b border-[#2a2a2a] pb-2">
            Çerezler ve Reklamlar
          </h2>
          <p>
            Sitemizde kullanıcı deneyimini artırmak ve ilgi alanlarına göre içerik sunmak amacıyla çerezler (cookies) kullanılmaktadır. 
          </p>
          <p>
            Üçüncü taraf satıcı olarak Google, sitemizde reklam yayınlamak için çerezlerden yararlanır. Google, DART çerezlerini kullanarak kullanıcılarımıza, sitemize ve internetteki diğer sitelere yaptıkları ziyaretlere dayalı reklamlar sunar. Kullanıcılar, Google reklam ve içerik ağı gizlilik politikasını ziyaret ederek DART çerezinin kullanılmasını engelleyebilirler.
          </p>

          <h2 className="text-lg font-bold text-white uppercase mt-6 border-b border-[#2a2a2a] pb-2">
            Dış Bağlantılar
          </h2>
          <p>
            thegopnik.com, içeriği gereği farklı internet adreslerine bağlantılar (linkler) verebilir. Bu bağlantıların gizlilik ilkelerinden ve içeriklerinden bağlantı sağlanan sitelerin kendisi sorumludur.
          </p>

          <h2 className="text-lg font-bold text-white uppercase mt-6 border-b border-[#2a2a2a] pb-2">
            İletişim
          </h2>
          <p>
            Gizlilik politikamız hakkında her türlü soru ve görüşünüzü <span className="text-[#00ffff]">info@thegopnik.com</span> adresi üzerinden bize iletebilirsiniz.
          </p>
        </div>
      </main>
    </div>
  );
}