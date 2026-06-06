"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { initializeApp, getApps } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Firebase Kurulumu (Vercel Çevre Değişkenlerinden Okuyacak)
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

  // Harf dönüştürücü: Kullanıcı Latin harfi yazarsa, doğru Rusça klasörünü bulması için
  const latinToCyrillicMap: { [key: string]: string } = {
    "A": "А", "B": "Б", "V": "В", "G": "Г", "D": "Д", "E": "Е", "YO": "Ё", "ZH": "Ж", 
    "Z": "З", "I": "И", "J": "Й", "K": "К", "L": "Л", "M": "М", "N": "Н", "O": "О", 
    "P": "П", "R": "Р", "S": "С", "T": "Т", "U": "У", "F": "Ф", "H": "Х", "C": "Ц", 
    "CH": "Ч", "SH": "Ш", "SHCH": "Щ", "Y": "Ы", "YU": "Ю", "YA": "Я"
  };

  useEffect(() => {
async function searchWords() {
  if (searchQuery.trim() === "") {
    setResults([]);
    return;
  }

  try {
    const searchStr = searchQuery.toLowerCase();
    const firstChar = searchQuery.trim().charAt(0).toUpperCase();
    
    // Firebase'deki gerçek koleksiyon listesi
    const collectionsList = [
      "birlestirilmis_А_sozlugu.json", "birlestirilmis_Б_sozlugu.json", "birlestirilmis_В_sozlugu.json",
      "birlestirilmis_Г_sozlugu.json", "birlestirilmis_Д_sozlugu.json", "birlestirilmis_Е_sozlugu.json",
      "birlestirilmis_Ж_sozlugu.json", "birlestirilmis_З_sozlugu.json", "birlestirilmis_И_sozlugu.json",
      "birlestirilmis_К_sozlugu.json", "birlestirilmis_Л_sozlugu.json", "birlestirilmis_М_sozlugu.json",
      "birlestirilmis_Н_sozlugu.json", "birlestirilmis_О_sozlugu.json", "birlestirilmis_П_sozlugu.json",
      "birlestirilmis_Р_sozlugu.json", "birlestirilmis_С_sozlugu.json", "birlestirilmis_Т_sozlugu.json",
      "birlestirilmis_У_sozlugu.json", "birlestirilmis_Ф_sozlugu.json", "birlestirilmis_Х_sozlugu.json",
      "birlestirilmis_Ц_sozlugu.json", "birlestirilmis_Ч_sozlugu.json", "birlestirilmis_Ш_sozlugu.json",
      "birlestirilmis_Щ_sozlugu.json", "birlestirilmis_Э_sozlugu.json", "birlestirilmis_Ю_sozlugu.json",
      "birlestirilmis_Я_sozlugu.json"
    ];

    // Eğer arama Rusça bir harfle başlıyorsa sadece o harfin klasörüne baksın (Hız için)
    let targetCollections = collectionsList;
    const cyrillicMatch = collectionsList.find(c => c.includes(`_${firstChar}_`));
    if (cyrillicMatch) {
      targetCollections = [cyrillicMatch];
    }

    const filtered: any[] = [];

    // Belirlenen klasörleri eşzamanlı olarak tara
    await Promise.all(
      targetCollections.map(async (colName) => {
        const colRef = collection(db, colName);
        const querySnapshot = await getDocs(colRef);
        
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          
          const matchRu = item.word_ru?.toLowerCase().includes(searchStr);
          const matchLatin = item.word_latin?.toLowerCase().includes(searchStr);
          
          // Türkçe anlam dizisi veya metni içinde ara
          const matchMeaningTr = Array.isArray(item.meaning_tr)
            ? item.meaning_tr.some((m: string) => m?.toLowerCase().includes(searchStr))
            : item.meaning_tr?.toLowerCase().includes(searchStr);
            
          // Anahtar kelimeler içinde ara
          const matchKeywords = Array.isArray(item.search_keywords)
            ? item.search_keywords.some((k: string) => k?.toLowerCase().includes(searchStr))
            : false;

          if (matchRu || matchLatin || matchMeaningTr || matchKeywords) {
            filtered.push(item);
          }
        });
      })
    );

    setResults(filtered);
  } catch (error) {
    console.error("Arama hatası:", error);
    setResults([]);
  }
}

    const delayDebounceFn = setTimeout(() => {
      searchWords();
    }, 300);

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
        
        {/* Başlık */}
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
  <div className="w-full max-w-3xl px-4 text-left space-y-6 mb-12 mx-auto">
    {results.map((item: any, index: number) => (
      <div key={index} className="p-8 rounded-2xl bg-[#1a1a1a] border border-[#333] shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <h3 className="text-3xl font-black text-white">{item.word_ru}</h3>
            <span className="text-lg text-gray-400 font-mono mt-1">({item.word_latin})</span>
          </div>
          <span className="text-xs px-3 py-1 rounded bg-[#C61010]/10 text-[#C61010] border border-[#C61010]/30 font-bold uppercase tracking-wider">
            Seviye: {item.severity_level}
          </span>
        </div>

        {/* Türkçe Anlamı */}
        <div className="mb-6">
          <span className="text-sm text-[#C61010] font-bold uppercase tracking-widest block mb-1">Türkçe Anlamı:</span>
          <p className="text-xl text-[#E0E0E0] font-medium leading-relaxed">
            {Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : item.meaning_tr}
          </p>
        </div>

        {/* Kültürel Açıklama */}
        <div className="mb-6">
          <span className="text-sm text-[#C61010] font-bold uppercase tracking-widest block mb-1">Kültürel Açıklama:</span> 
          <p className="text-lg text-gray-300 leading-relaxed italic">
            {item.cultural_context || "Bu ifade için özel bir kültürel not bulunmuyor."}
          </p>
        </div>
        
        {/* Örnek Kutusu - Neon Mavi ve Kırmızı ile */}
        {item.examples && item.examples.length > 0 && (
          <div className="p-6 bg-[#0f0f0f] rounded-xl border-l-4 border-[#00d4ff] text-base">
            <p className="text-[#00d4ff] font-bold mb-2">“{item.examples[0].ru}”</p>
            <p className="text-[#C61010] font-semibold">→ {item.examples[0].tr}</p>
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