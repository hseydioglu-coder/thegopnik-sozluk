"use client";

import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function searchWords() {
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const searchStr = searchQuery.toLowerCase();
      const colRef = collection(db, "sozluk");
      const querySnapshot = await getDocs(colRef);
      
      const filtered: any[] = [];
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        
        const matchRu = item.word_ru?.toLowerCase().includes(searchStr);
        const matchLatin = item.word_latin?.toLowerCase().includes(searchStr);
        const matchMeaningTr = Array.isArray(item.meaning_tr)
          ? item.meaning_tr.some((m: any) => m?.toLowerCase().includes(searchStr))
          : item.meaning_tr?.toLowerCase().includes(searchStr);
        const matchKeywords = Array.isArray(item.search_keywords)
          ? item.search_keywords.some((k: any) => k?.toLowerCase().includes(searchStr))
          : false;

        if (matchRu || matchLatin || matchMeaningTr || matchKeywords) {
          filtered.push(item);
        }
      });

      setResults(filtered);
    } catch (error) {
      console.error("Arama hatası:", error);
      setResults([]);
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center pt-12">
      {/* Arama Alanı */}
      <div className="w-full max-w-3xl px-4 mb-8 flex gap-4">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kelime ara (Ru / Tr)..." 
          className="flex-1 p-4 bg-[#1F1F1F] border border-[#333] rounded-xl text-xl text-white focus:outline-none focus:border-[#00d4ff]"
        />
        <button onClick={searchWords} className="px-8 py-4 bg-[#C61010] text-white font-bold rounded-xl text-xl hover:bg-[#a30d0d] transition-colors">
          Ara
        </button>
      </div>

      {/* Sonuç Listesi */}
      {results.length > 0 && (
        <div className="w-full max-w-3xl px-4 text-left space-y-6 mb-12 mx-auto">
          {results.map((item: any, index: number) => (
            <div key={index} className="p-8 rounded-2xl bg-[#1a1a1a] border border-[#333] shadow-2xl w-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <h3 className="text-4xl font-black text-[#00d4ff]">{item.word_ru}</h3>
                  <span className="text-xl text-gray-400 font-mono mt-1">({item.word_latin})</span>
                </div>
                <span className="text-xs px-3 py-1 rounded bg-[#C61010]/10 text-[#C61010] border border-[#C61010]/30 font-bold uppercase tracking-wider">
                  Seviye: {item.severity_level}
                </span>
              </div>

              {/* Türkçe Anlamı */}
              <div className="mb-6">
                <span className="text-sm text-[#C61010] font-bold uppercase tracking-widest block mb-1">Türkçe Anlamı:</span>
                <p className="text-2xl text-[#C61010] font-bold leading-relaxed">
                  {Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : item.meaning_tr}
                </p>
              </div>

              {/* Kültürel Açıklama */}
              <div className="mb-6">
                <span className="text-sm text-[#C61010] font-bold uppercase tracking-widest block mb-1">Kültürel Açıklama:</span> 
                <p className="text-xl text-gray-300 leading-relaxed">
                  {item.cultural_context || "Bu ifade için özel bir kültürel not bulunmuyor."}
                </p>
              </div>
              
              {/* Örnek Kutusu */}
              {item.examples && item.examples.length > 0 && (
                <div className="p-6 bg-[#0f0f0f] rounded-xl border-l-4 border-[#00d4ff] text-xl">
                  <p className="text-[#00d4ff] font-bold mb-2">“{item.examples[0].ru}”</p>
                  <p className="text-[#C61010] font-bold">→ {item.examples[0].tr}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}