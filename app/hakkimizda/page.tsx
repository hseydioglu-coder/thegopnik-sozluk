"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hakkimizda() {
  const [lang, setLang] = useState<'tr' | 'ru'>('tr');

  // URL'deki dili kontrol eden güvenli fonksiyon
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('lang') === 'ru') {
        setLang('ru');
      }
    }
  }, []);

  // Akademik Metin Sözlüğü (TDK Standartlarına Uygun Türkçe ve Karşılığı Rusça)
  const pageContent = {
    tr: {
      backBtn: "← ANA SAYFA",
      title: "Hakkımızda: Rus Leksikografisinde Sosyolinguistik Bir İnceleme",
      sec1Title: "1. Özet ve Giriş",
      sec1Text1: "Dil, durağan bir yapıdan ziyade sosyokültürel dinamiklerle sürekli evrilen canlı bir organizmadır. Geleneksel sözlük bilimi (leksikografi), genellikle standart ve kuralsal (preskriptif) dili kayıt altına alma eğilimindeyken; toplumun alt katmanlarında, sokak kültüründe ve günlük gayriresmî iletişimde filizlenen halk ağzı, argo ve jargon çoğu zaman akademik çalışmaların çeperinde bırakılmaktadır.",
      sec1Text2: "THE GOPNİK, Rusçanın bu göz ardı edilen, ancak sosyolinguistik ve pragmatik açıdan büyük önem taşıyan katmanını mercek altına alan, açık kaynaklı dijital bir derlem ve araştırma platformudur.",
      sec2Title: "2. Kavramsal Çerçeve: Rus Sokak Dili ve \"Mat\"",
      sec2Text1: "Rus dil biliminde standart dışı leksikoloji, özellikle \"mat\" (küfürlü dil) ve sokak jargonu, tarihsel süreçte kendine has bir morfolojik üretkenlik ve semantik derinlik kazanmıştır. Ön eklerin (pristavka) ve son eklerin yoğun kullanımıyla şekillenen bu dil katmanı, yalnızca bir öfke dışavurumu değil; aynı zamanda aidiyet, hiyerarşi, ironi ve alt kültür kimliğinin inşasında kullanılan karmaşık bir göstergebilimsel sistemdir.",
      sec2Text2: "Platformumuz, bu yapıların kültürel arka planlarını reddetmek yerine, onları birer dil bilimsel veri (corpus) olarak kabul eder ve nesnel bir analitik düzlemde inceler.",
      sec3Title: "3. Metodolojik Yaklaşım ve Çeviri İlkeleri",
      sec3Text1: "Bu veri tabanında yer alan her bir leksikal birim rastgele seçilmemiş; etimolojik kökeni, anlamsal evrimi ve kullanıldığı kültürel bağlam göz önünde bulundurularak sınıflandırılmıştır. Platformun metodolojik temelini şu unsurlar oluşturur:",
      li1: "Kültürel Bağlamsallaştırma: Kelimelerin yalnızca sözlük anlamları değil, hangi sosyolojik durumlarda (pragmatik işlev) kullanıldığı detaylandırılır.",
      li2: "Standartlara Tam Uyum: Rusça halk ağzına ait gayriresmî ifadelerin Türkçeye aktarımında kavramsal doğruluk hedeflenirken, tüm çevirilerin ve metinsel açıklamaların Türk Dil Kurumu (TDK) yazım ve noktalama kurallarına eksiksiz bir şekilde uyması temel standart olarak benimsenmiştir.",
      li3: "Derecelendirme Sistemi: İfadeler, taşıdıkları şiddet ve tabu seviyelerine göre tasnif edilerek araştırmacılara objektif bir metrik sunulur.",
      sec4Title: "4. Araştırmanın Amacı ve Hedef Kitle",
      sec4Text1: "THE GOPNİK projesinin nihai amacı; sansür mekanizmalarının dilde yarattığı veri kaybını önlemek ve sokak edebiyatının filtresiz doğasını akademik bir ciddiyetle belgelemektir. Bu platform, yalnızca pratik bir çeviri aracı olmayıp; çevirmenler, Slavistik araştırmacıları, edebiyat bilimciler, dil kurgusu yapan yazarlar ve iki farklı toplumun sokak kültürleri arasındaki sosyolojik bağları incelemek isteyen uzmanlar için tasarlanmış kapsamlı bir referans kaynağıdır."
    },
    ru: {
      backBtn: "← НА ГЛАВНУЮ",
      title: "О нас: Социолингвистическое исследование в русской лексикографии",
      sec1Title: "1. Аннотация и введение",
      sec1Text1: "Язык — это живой организм, который постоянно развивается под влиянием социокультурной динамики, а не статичная структура. В то время как традиционная лексикография стремится фиксировать стандартный и прескриптивный язык, народные говоры, сленг и жаргон, развивающиеся в нижних слоях общества и в повседневной неформальной коммуникации, часто остаются на периферии академических исследований.",
      sec1Text2: "THE GOPNIK — это независимая цифровая платформа для исследований и формирования корпуса данных, ориентированная на детальное изучение этого упущенного из виду, но крайне важного с социолингвистической и прагматической точек зрения пласта русского языка.",
      sec2Title: "2. Теоретическая база: Русский уличный язык и мат",
      sec2Text1: "В русском языкознании нестандартная лексикология, особенно мат (обсценная лексика) и уличный жаргон, в ходе исторического процесса приобрели уникальную морфологическую продуктивность и семантическую глубину. Этот языковой пласт, формирующийся за счет активного использования приставок и суффиксов, представляет собой не просто выплеск эмоций, а сложную семиотическую систему, используемую для построения идентичности субкультур, иерархии, иронии и чувства принадлежности.",
      sec2Text2: "Наша платформа принимает эти структуры как лингвистические данные (корпус) и анализирует их в объективной аналитической плоскости, вместо того чтобы отрицать их культурный контекст.",
      sec3Title: "3. Методологический подход и принципы перевода",
      sec3Text1: "Каждая лексическая единица в этой базе данных была классифицирована с учетом ее этимологического происхождения, смысловой эволюции и культурного контекста использования. Методологическую основу платформы составляют следующие элементы:",
      li1: "Культурная контекстуализация: Детализируются не только словарные значения слов, но и социологические ситуации, в которых они используются (прагматическая функция).",
      li2: "Полное соответствие стандартам: При переносе неформальных выражений русского народного языка на турецкий язык ставится цель достижения концептуальной точности, при этом в качестве базового стандарта принято полное соответствие всех переводов и текстовых пояснений правилам орфографии и пунктуации Ассоциации турецкого языка (TDK).",
      li3: "Система классификации: Выражения классифицируются по уровням содержащейся в них грубости и табуированности, что предоставляет исследователям объективную метрику.",
      sec4Title: "4. Цель исследования и целевая аудитория",
      sec4Text1: "Конечная цель проекта THE GOPNIK — предотвратить потерю данных, вызванную механизмами цензуры в языке, и задокументировать неотфильтрованную природу уличной литературы с академической серьезностью. Эта платформа является не просто практическим инструментом перевода, а всеобъемлющим справочным ресурсом, разработанным для переводчиков, исследователей-славистов, литературоведов, авторов и экспертов, желающих изучить социологические связи между уличными культурами двух разных обществ."
    }
  };

  const current = pageContent[lang];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#E0E0E0] flex flex-col font-sans antialiased p-6 sm:p-12">
      <main className="max-w-4xl mx-auto w-full pt-12 pb-16">
        <Link href={`/?lang=${lang}`} className="text-[#00ffff] hover:underline text-sm font-bold tracking-wider uppercase mb-8 inline-block">
          {current.backBtn}
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-black text-[#C61010] mb-12 uppercase tracking-tight border-b border-[#2a2a2a] pb-4">
          {current.title}
        </h1>
        
        <article className="space-y-8 text-base sm:text-lg leading-relaxed text-[#c0c0c0] text-justify">
          <section>
            <h2 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">{current.sec1Title}</h2>
            <p className="mb-4">{current.sec1Text1}</p>
            <p>{current.sec1Text2}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">{current.sec2Title}</h2>
            <p className="mb-4">{current.sec2Text1}</p>
            <p>{current.sec2Text2}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">{current.sec3Title}</h2>
            <p className="mb-4">{current.sec3Text1}</p>
            <ul className="list-disc pl-6 space-y-3 mt-4 text-[#a0a0a0]">
              <li>{current.li1}</li>
              <li>{current.li2}</li>
              <li>{current.li3}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">{current.sec4Title}</h2>
            <p>{current.sec4Text1}</p>
          </section>
        </article>
      </main>
    </div>
  );
}