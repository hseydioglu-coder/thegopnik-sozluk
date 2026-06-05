"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Firebase Kurulumu (Vercel Çevre Değişkenlerinden Okuyacak)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default function Home() {
  const [lang, setLang] = useState("tr");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const content = {
    tr: {
      title: "THE GOPNİK",
      subtitle: "RUS SOKAK DİLİ ve EDEBİYATI SÖZLÜĞÜ",
      placeholder: "Bir kelime veya argo deyim ara...",
      btnText: "BUL",
      warning: "+18 | İÇERİK ARGO VE SOKAK DİLİ İÇERMEKTEDİR",
    },
    ru: {
      title: "THE ГОПНИК",
      subtitle: "СЛОВАРЬ РУССКОГО УЛИЧНОГО ЯЗЫКА И ЛИТЕРАТУРЫ",
      placeholder: "Введите слово или сленговое выражение...",
      btnText: "ИСКАТЬ",
      warning: "+18 | СОДЕРЖИТ НЕНОРМАТИВНУЮ ЛЕКСИКУ И УЛИЧНЫЙ ЖАРГОН",
    },
  };

  useEffect(() => {
    async function searchWords() {
      if (searchQuery.trim() === "") {
        setResults([]);
        return;
      }

      const rawQuery = searchQuery.trim();
      const firstChar = rawQuery.charAt(0).toUpperCase(); // İlk harfi büyük yap (А, Б için)
      
      const searchStr = rawQuery.toLowerCase();

      try {
        // Gohrega Tekniği: Sadece ilgili harfin koleksiyonuna (tablosuna) sorgu atıyoruz
        // Firebase koleksiyon isimleri: "birlestirilmis_А_sozlugu", "birlestirilmis_Б_sozlugu" olacak
        const collectionName = `birlestirilmis_${firstChar}_sozlugu`;
        const wordRef = collection(db, collectionName);
        
        const q = query(wordRef);
        const querySnapshot = await getDocs(q);
        
        const filtered: any[] = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          
          const matchRu = item.word_ru?.toLowerCase().includes(searchStr);
          const matchLatin = item.word_latin?.toLowerCase().includes(searchStr);
          const matchKeywords = item.search_keywords?.some((keyword: string) => 
            keyword.toLowerCase().includes(searchStr)
          );

          if (matchRu || matchLatin || matchKeywords) {
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
    }, 300); // Kullanıcı yazmayı bitirdikten 300ms sonra ara (Firebase kotasını korur)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] flex flex-col">
      {/* Header - Dil Seçimi */}
      <header className="w-full flex justify-end p-4">
        <div className="flex border border-[#333]">
          <button 
            onClick={() => setLang("tr")} 
            className={`px-3 py-1 text-xs font-bold transition-colors ${lang === "tr" ? "bg-[#C61010] text-white" : "bg-transparent text-[#E0E0E0]"}`}
          >
            TR
          </button>
          <button 
            onClick={() => setLang("ru")} 
            className={`px-3 py-1 text-xs font-bold border-l border-[#333] transition-colors ${lang === "ru" ? "bg-[#C61010] text-white" : "bg-transparent text-[#E0E0E0]"}`}
          >
            RU
          </button>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-grow flex flex-col items-center pt-[15vh] px-4 text-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 opacity-90">
          <Image alt="logogopnik.png" src="/logogopnik.png" fill className="object-contain" priority />
        </div>
        
        {/* Başlık: +18 yerleşimi (-top-0 -right-4) */}
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#C61010] pt-2">
          {lang === "tr" ? (
            <>
              THE GOPNİ<span className="relative">K<span className="absolute -top-0 -right-4 text-[10px] font-black leading-none">+18</span></span>
            </>
          ) : (
            <>
              THE ГОПНИ<span className="relative">К<span className="absolute -top-0 -right-4 text-[10px] font-black leading-none">+18</span></span>
            </>
          )}
        </h1>
        
        <p className="text-[10px] sm:text-xs font-semibold text-[#B3B3B3] tracking-[0.2em] uppercase mt-4 mb-10 max-w-md whitespace-nowrap px-2">
          {content[lang].subtitle}
        </p>

        {/* Arama Kutusu */}
        <div className="w-full max-w-lg px-4 mb-8">
          <div className="relative flex items-center w-full h-12 rounded-full shadow-lg bg-[#1F1F1F] border border-[#333] pl-5 pr-2">
            <input 
              className="h-full w-full outline-none text-sm text-[#E0E0E0] font-medium bg-transparent placeholder-[#777] placeholder:text-xs" 
              placeholder={content[lang].placeholder}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="h-8 px-5 rounded-full bg-[#C61010] text-white font-bold text-xs hover:bg-[#a30d0d] transition-colors"
            >
              {content[lang].btnText}
            </button>
          </div>
        </div>

        {/* Sonuç Listesi */}
        {results.length > 0 && (
          <div className="w-full max-w-lg px-4 text-left space-y-4 mb-12">
            {results.map((item: any, index: number) => (
              <div key={index} className="p-5 rounded-xl bg-[#1F1F1F] border border-[#222] shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.word_ru} <span className="text-xs font-normal text-gray-500">({item.word_latin})</span></h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#C61010]/20 text-[#C61010] border border-[#C61010]/30 font-bold">
                    Seviye: {item.severity_level}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-1"><span className="text-xs text-gray-600 font-bold">Anlamı:</span> {Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : item.meaning_tr}</p>
                <p className="text-xs text-gray-500 italic mb-3"><span className="text-[10px] text-gray-600 font-bold">Mecaz/Birebir:</span> {item.literal_translation_tr}</p>
                
                {item.examples && item.examples.length > 0 && (
                  <div className="p-3 bg-[#121212] rounded border border-[#252525] text-xs">
                    <p className="text-gray-300 font-serif mb-1">“{item.examples[0].ru}”</p>
                    <p className="text-gray-500">→ {item.examples[0].tr}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 mt-auto">
        <p className="text-[9px] sm:text-[10px] text-[#C61010] font-bold uppercase tracking-[0.2em] border-t border-[#333] pt-4">
          {content[lang].warning}
        </p>
      </footer>
    </div>
  );
}