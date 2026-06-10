"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GizlilikPolitikasi() {
  const [lang, setLang] = useState<'tr' | 'ru'>('tr');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('lang') === 'ru') {
        setLang('ru');
      }
    }
  }, []);

  const pageContent = {
    tr: {
      backBtn: "← ANA SAYFA",
      title: "Gizlilik Politikası",
      intro: "Bu gizlilik politikası, thegopnik.com internet sitesi üzerinden toplanan bilgilerin ne şekilde kullanıldığını, korunduğunu ve paylaşıldığını açıklamaktadır.",
      sec1Title: "Log Dosyaları",
      sec1Text: "Birçok standart web sunucusunda olduğu gibi thegopnik.com da istatistiksel amaçlı log dosyaları kaydetmektedir. Bu dosyalar; IP adresiniz, tarayıcı türünüz, internet servis sağlayıcınız, siteye giriş-çıkış sayfalarınız ve tıklama sayınız gibi standart bilgileri içerir. Bu veriler şahsi bilgilerinizle ilişkilendirilmez ve yalnızca site performans analizi amacıyla kullanılır.",
      sec2Title: "Çerezler ve Reklamlar",
      sec2Text1: "Sitemizde kullanıcı deneyimini artırmak ve ilgi alanlarına göre içerik sunmak amacıyla çerezler (cookies) kullanılmaktadır.",
      sec2Text2: "Üçüncü taraf satıcı olarak Google, sitemizde reklam yayınlamak için çerezlerden yararlanır. Google, DART çerezlerini kullanarak kullanıcılarımıza, sitemize ve internetteki diğer sitelere yaptıkları ziyaretlere dayalı reklamlar sunar. Kullanıcılar, Google reklam ve içerik ağı gizlilik politikasını ziyaret ederek DART çerezinin kullanılmasını engelleyebilirler.",
      sec3Title: "Dış Bağlantılar",
      sec3Text: "thegopnik.com, içeriği gereği farklı internet adreslerine bağlantılar (linkler) verebilir. Bu bağlantıların gizlilik ilkelerinden ve içeriklerinden bağlantı sağlanan sitelerin kendisi sorumludur.",
      sec4Title: "İletişim",
      sec4Text: "Gizlilik politikamız hakkında her türlü soru ve görüşünüzü info@thegopnik.com adresi üzerinden bize iletebilirsiniz."
    },
    ru: {
      backBtn: "← НА ГЛАВНУЮ",
      title: "Политика конфиденциальности",
      intro: "Настоящая политика конфиденциальности объясняет, как информация, собираемая через интернет-сайт thegopnik.com, используется, защищается и распространяется.",
      sec1Title: "Лог-файлы",
      sec1Text: "Как и большинство стандартных веб-серверов, thegopnik.com записывает лог-файлы в статистических целях. Эти файлы содержат стандартную информацию, такую как ваш IP-адрес, тип браузера, интернет-провайдер, страницы входа и выхода с сайта, а также количество кликов. Эти данные не связаны со специальной личной информацией и используются исключительно для анализа производительности сайта.",
      sec2Title: "Файлы cookie и реклама",
      sec2Text1: "На нашем сайте файлы cookie используются для улучшения пользовательского опыта и предоставления контента в соответствии с интересами пользователей.",
      sec2Text2: "Google, как сторонний поставщик, использует файлы cookie для показа рекламы на нашем сайте. Используя файлы cookie DART, Google подбирает рекламу для наших пользователей на основе их посещений нашего сайта и других ресурсов в Интернете. Пользователи могут отключить использование файлов cookie DART, посетив политику конфиденциальности для объявлений и сети партнерских сайтов Google.",
      sec3Title: "Внешние ссылки",
      sec3Text: "В силу специфики своего контента, thegopnik.com может содержать ссылки на другие интернет-адреса. За политику конфиденциальности и содержание сторонних ресурсов ответственность несут исключительно сами эти сайты.",
      sec4Title: "Контакты",
      sec4Text: "Вы можете направлять любые вопросы и отзывы о нашей политике конфиденциальности на адрес info@thegopnik.com."
    }
  };

  const current = pageContent[lang];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#E0E0E0] flex flex-col font-sans antialiased p-6 sm:p-12">
      <main className="max-w-3xl mx-auto w-full pt-12 pb-16">
        <Link href={`/?lang=${lang}`} className="text-[#00ffff] hover:underline text-sm font-bold tracking-wider uppercase mb-8 inline-block">
          {current.backBtn}
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black text-[#C61010] mb-8 uppercase tracking-tight">
          {current.title}
        </h1>
        
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#c0c0c0]">
          <p>{current.intro}</p>
          
          <h2 className="text-lg font-bold text-white uppercase mt-6 border-b border-[#2a2a2a] pb-2">
            {current.sec1Title}
          </h2>
          <p>{current.sec1Text}</p>

          <h2 className="text-lg font-bold text-white uppercase mt-6 border-b border-[#2a2a2a] pb-2">
            {current.sec2Title}
          </h2>
          <p>{current.sec2Text1}</p>
          <p>{current.sec2Text2}</p>

          <h2 className="text-lg font-bold text-white uppercase mt-6 border-b border-[#2a2a2a] pb-2">
            {current.sec3Title}
          </h2>
          <p>{current.sec3Text}</p>

          <h2 className="text-lg font-bold text-white uppercase mt-6 border-b border-[#2a2a2a] pb-2">
            {current.sec4Title}
          </h2>
          <p>
            {lang === 'tr' ? (
              <>Gizlilik politikamız hakkında her türlü soru ve görüşünüzü <span className="text-[#00ffff]">info@thegopnik.com</span> adresi üzerinden bize iletebilirsiniz.</>
            ) : (
              <>Вы можете направлять любые вопросы и отзывы о нашей политике конфиденциальности на адрес <span className="text-[#00ffff]">info@thegopnik.com</span>.</>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}