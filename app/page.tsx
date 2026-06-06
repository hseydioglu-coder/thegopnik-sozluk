"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

// Firebase Kurulumu
const firebaseConfig = {
  apiKey: "AIzaSyBYdaNaMFJ1yheOXuuac-Aadts9RjUjTxc",
  authDomain: "thegopnik-fb24e.firebaseapp.com",
  databaseURL: "https://thegopnik-fb24e-default-rtdb.firebaseio.com",
  projectId: "thegopnik-fb24e",
  storageBucket: "thegopnik-fb24e.firebasestorage.app",
  messagingSenderId: "333801156032",
  appId: "1:333801156032:web:12d3e87fc9d42061ea2c25",
  measurementId: "G-J6H0S92575"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default function Home() {
  const [lang, setLang] = useState<"tr" | "ru">("tr");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const content = {
    tr: {
      title: "THE GOPNİK",
      subtitle: "RUS SOKAK DİLİ ve EDEBİYATI SÖZLÜĞÜ",
      placeholder: "Bir kelime veya argo deyim ara...",
      btnText: "BUL",
      warning: "+18 | İÇERİK ARGO VE SOKAK DİLİ İÇERMEKTEDİR!",
      warningBoxTitle: "UYARI / ПРЕДУПРЕЖДЕНИЕ",
      warningBoxText: "Bu platformdaki içerikler yetişkinlere yöneliktir ve ağır argo, küfür ile sokak jargonu barındırır. Lütfen hassasiyetiniz varsa siteyi kullanmayınız.",
      examplesTitle: "Örnek Argo İfadeler (Göster)",
    },
    ru: {
      title: "THE ГОПНИК",
      subtitle: "СЛОВАРЬ РУССКОГО УЛИЧНОГО ЯЗЫКА И ЛИТЕРАТУРЫ",
      placeholder: "Введите слово или сленговое выражение...",
      btnText: "ИСКАТЬ",
      warning: "+18 | СОДЕРЖИТ НЕНОРМАТИВНУЮ ЛЕКСИКУ И УЛИЧНЫЙ ЖАРГОН!",
      warningBoxTitle: "ВНИМАНИЕ / UYARI",
      warningBoxText: "Контент на этой платформе предназначен для взрослых и содержит тяжелый сленг, мат и уличный жаргон. Если вы чувствительны к подобному, пожалуйста, покиньте сайт.",
      examplesTitle: "Примеры Сленга (Показать)",
    },
  };

  const sampleSlang = [
    { ru: "Бл...ь", tr: "Kahretsin" },
    { ru: "Пиз...ц", tr: "Felaket" },
    { ru: "Х...й", tr: "Y...k" },
    { ru: "Еб...ть", tr: "S...mek" },
    { ru: "Муд...к", tr: "P...t" },
    { ru: "Су...а", tr: "O...pu" },
    { ru: "Зае...л", tr: "Bıktırdı" },
    { ru: "Ганд...н", tr: "P...şt" }
  ];

  useEffect(() => {
    async function searchWords() {
      if (searchQuery.trim() === "") {
        setResults([]);
        return;
      }

      const searchStr = searchQuery.trim().toLowerCase();

      try {
        const wordRef = collection(db, "sozluk");
        const q = query(wordRef);
        const querySnapshot = await getDocs(q);
        
        const filtered: any[] = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          
          const matchRu = item.word_ru?.toLowerCase().includes(searchStr);
          const matchLatin = item.word_latin?.toLowerCase().includes(searchStr);
          const matchMeaningTr = Array.isArray(item.meaning_tr)
            ? item.meaning_tr.some((m: string) => m?.toLowerCase().includes(searchStr))
            : item.meaning_tr?.toLowerCase().includes(searchStr);
            
          const matchKeywords = item.search_keywords?.some((keyword: string) => 
            keyword.toLowerCase().includes(searchStr)
          );

          if (matchRu || matchLatin || matchMeaningTr || matchKeywords) {
            filtered.push(item);
          }
        });

        setResults(filtered);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setResults([]);
      }
    }

    const delayDebounceFn = setTimeout(() => {
      searchWords();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#E0E0E0] flex flex-col font-sans antialiased">
      {/* Header - Dil Seçimi */}
      <header className="w-full flex justify-end p-4">
        <div className="flex border border-[#333] rounded overflow-hidden">
          <button 
            onClick={() => setLang("tr")} 
            className={`px-4 py-1.5 text-sm font-bold transition-colors ${lang === "tr" ? "bg-[#C61010] text-white" : "bg-[#1a1a1a] text-[#a0a0a0] hover:text-white"}`}
          >
            TR
          </button>
          <button 
            onClick={() => setLang("ru")} 
            className={`px-4 py-1.5 text-sm font-bold border-l border-[#333] transition-colors ${lang === "ru" ? "bg-[#C61010] text-white" : "bg-[#1a1a1a] text-[#a0a0a0] hover:text-white"}`}
          >
            RU
          </button>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-grow flex flex-col items-center pt-[5vh] sm:pt-[8vh] px-4 sm:px-8 text-center w-full">
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 mb-4 opacity-95">
          <Image alt="logogopnik.png" src="/logogopnik.png" fill className="object-contain" priority />
        </div>
        
        {/* Başlık */}
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#C61010] pt-2 drop-shadow-md">
          {lang === "tr" ? (
            <>THE GOPNİ<span className="relative">K<span className="absolute -top-0 -right-6 text-xs sm:text-sm font-black leading-none text-[#ff3333]">+18</span></span></>
          ) : (
            <>THE ГОПНИ<span className="relative">К<span className="absolute -top-0 -right-6 text-xs sm:text-sm font-black leading-none text-[#ff3333]">+18</span></span></>
          )}
        </h1>
        
        <p className="text-xs sm:text-sm font-semibold text-[#8a8a8a] tracking-[0.25em] uppercase mt-4 mb-10 px-2">
          {content[lang].subtitle}
        </p>

        {/* Arama Kutusu */}
        <div className="w-full w-11/12 max-w-4xl mb-8">
          <div className="relative flex items-center w-full h-16 sm:h-20 rounded-2xl shadow-2xl bg-[#1a1a1a] border border-[#333] pl-6 pr-3 focus-within:border-[#00ffff] transition-colors">
            <input 
              className="h-full w-full outline-none text-lg sm:text-2xl text-white font-medium bg-transparent placeholder-[#666]" 
              placeholder={content[lang].placeholder}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="h-12 sm:h-14 px-8 rounded-xl bg-[#C61010] text-white font-bold text-sm sm:text-lg hover:bg-[#ff3333] transition-colors shadow-[0_0_10px_rgba(198,16,16,0.5)]"
            >
              {content[lang].btnText}
            </button>
          </div>
        </div>

        {/* Ana Sayfa Uyarı Kutusu ve Örnek Kelimeler (Sadece arama yapılmamışsa görünür) */}
        {results.length === 0 && (
          <div className="w-full w-11/12 max-w-4xl flex flex-col items-center">
            
            {/* Uyarı Kutusu */}
            <div className="w-full mb-8 p-6 bg-[#1a0505] border border-[#ff0000]/30 rounded-2xl shadow-[0_0_15px_rgba(255,0,0,0.15)] text-center">
              <h2 className="text-lg sm:text-xl font-black text-[#ff0000] mb-3 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">
                ⚠️ {content[lang].warningBoxTitle} ⚠️
              </h2>
              <p className="text-[#c0c0c0] text-sm sm:text-base font-medium leading-relaxed">
                {content[lang].warningBoxText}
              </p>
            </div>

            {/* Örnek Argo İfadeler */}
            <div className="w-full mb-16">
              <h3 className="text-xs sm:text-sm font-bold text-[#666] uppercase tracking-widest mb-4 border-b border-[#333] pb-2 inline-block">
                {content[lang].examplesTitle}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sampleSlang.map((ex, i) => (
                  <div 
                    key={i} 
                    className="group p-4 bg-[#141414] border border-[#2a2a2a] rounded-xl hover:border-[#ff0000]/50 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-crosshair"
                  >
                    {/* Hover ile bulanıklıktan netleşen Rusça kelime */}
                    <span className="text-[#00ffff] font-black text-lg sm:text-xl blur-sm group-hover:blur-none transition-all duration-300 drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
                      {ex.ru}
                    </span>
                    {/* Hover ile bulanıklıktan netleşen Türkçe kelime */}
                    <span className="text-[#ff3333] font-bold text-xs sm:text-sm mt-2 blur-sm group-hover:blur-none transition-all duration-300">
                      {ex.tr}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Sonuç Listesi */}
        {results.length > 0 && (
          <div className="w-full w-11/12 max-w-4xl text-left space-y-8 mb-16 mt-4">
            {results.map((item: any, index: number) => (
              <div key={index} className="p-8 sm:p-10 rounded-2xl bg-[#141414] border border-[#2a2a2a] shadow-2xl">
                
                {/* Üst Kısım: Rusça Kelime ve Seviye */}
                <div className="flex justify-between items-start mb-6 border-b border-[#2a2a2a] pb-6">
                  <div>
                    <h3 className="text-4xl sm:text-5xl font-black text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] tracking-wide">
                      {item.word_ru}
                    </h3>
                    {item.word_latin && (
                      <span className="block text-xl sm:text-2xl text-[#888] font-medium mt-3">
                        ({item.word_latin})
                      </span>
                    )}
                  </div>
                  
                  {item.severity_level && (
                    <span className="text-xs sm:text-sm px-3 py-1 rounded bg-[#C61010]/10 text-[#ff3333] border border-[#C61010]/40 font-bold uppercase tracking-wider shrink-0 ml-4">
                      Seviye: {item.severity_level}
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Anlamsal Çeviri */}
                  <div>
                    <span className="text-sm font-bold text-[#666] uppercase tracking-widest block mb-2">Anlamsal Çeviri:</span>
                    <p className="text-2xl sm:text-3xl font-bold text-[#ff3333] drop-shadow-[0_0_8px_rgba(255,51,51,0.5)] leading-snug">
                      {Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : item.meaning_tr}
                    </p>
                  </div>

                  {/* Kültürel Açıklama */}
                  {item.cultural_context && (
                    <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#333]">
                      <span className="text-xs font-bold text-[#666] uppercase tracking-widest block mb-2">Kültürel Açıklama:</span>
                      <p className="text-base sm:text-lg text-[#d0d0d0] leading-relaxed">
                        {item.cultural_context}
                      </p>
                    </div>
                  )}

                  {/* Birebir Çeviri */}
                  {item.literal_translation_tr && (
                    <div>
                      <span className="text-xs font-bold text-[#666] uppercase tracking-widest block mb-1">Birebir Çeviri:</span>
                      <p className="text-base sm:text-lg text-[#a0a0a0] italic">
                        {item.literal_translation_tr}
                      </p>
                    </div>
                  )}

                  {/* Örnek Kullanım */}
                  {item.examples && item.examples.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-[#2a2a2a]">
                      <span className="text-xs font-bold text-[#666] uppercase tracking-widest block mb-3">Örnek Kullanım:</span>
                      <div className="p-5 bg-[#0a0a0a] rounded-xl border-l-4 border-[#00ffff]">
                        <p className="text-[#00ffff] font-medium text-lg sm:text-xl mb-2">“{item.examples[0].ru}”</p>
                        <p className="text-[#ff3333] text-base sm:text-lg">→ {item.examples[0].tr}</p>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 mt-auto bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <p className="text-xs sm:text-sm text-[#ff0000] font-black uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(255,0,0,0.9)]">
          {content[lang].warning}
        </p>
      </footer>
    </div>
  );
}