"use client";

import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// BURAYA KENDİ GERÇEK FİREBASE ŞİFRELERİNİ YAZMAYI UNUTMA
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
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

        if (matchRu || matchLatin || matchMeaningTr) {
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
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Arama Çubuğu */}
      <div className="max-w-4xl mx-auto flex gap-4 mb-12 mt-10">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kelime ara (Rusça veya Türkçe)..." 
          className="flex-1 p-6 bg-[#1a1a1a] border border-[#333] rounded-lg text-2xl text-white focus:outline-none focus:border-[#00ffff]"
        />
        <button onClick={searchWords} className="px-12 py-6 bg-[#ff0000] text-white font-bold rounded-lg text-2xl hover:bg-[#cc0000]">
          Ara
        </button>
      </div>

      {/* Sonuçlar */}
      <div className="max-w-4xl mx-auto space-y-10">
        {results.map((item: any, index: number) => (
          <div key={index} className="p-10 bg-[#141414] border border-[#222] rounded-xl shadow-2xl flex flex-col gap-6">
            
            {/* Rusça Kelime (Neon Mavi) */}
            <div>
              <h2 className="text-6xl font-black text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">
                {item.word_ru}
              </h2>
              {item.word_latin && (
                <span className="text-2xl text-gray-500 mt-2 block">({item.word_latin})</span>
              )}
            </div>

            <hr className="border-[#333] my-2" />

            {/* Kök Fiil Alanı */}
            {(item.base_verb || item.base_verb_tr) && (
              <div className="bg-[#1a1a1a] p-5 rounded-lg border border-[#333]">
                <span className="text-sm text-gray-400 uppercase tracking-widest block mb-2">Kök Fiil:</span>
                {item.base_verb && <p className="text-3xl font-bold text-[#00ffff]">{item.base_verb}</p>}
                {item.base_verb_tr && <p className="text-xl font-bold text-[#ff0000] mt-1">Anlamı: {item.base_verb_tr}</p>}
              </div>
            )}

            {/* Türkçe Anlam (Kırmızı) */}
            <div>
              <span className="text-sm text-gray-400 uppercase tracking-widest block mb-2">Türkçe Anlamı:</span>
              <p className="text-4xl font-bold text-[#ff0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] leading-tight">
                {Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : item.meaning_tr}
              </p>
            </div>

            {/* Örnek Cümleler */}
            {item.examples && item.examples.length > 0 && (
              <div className="mt-4 p-8 bg-[#0a0a0a] rounded-lg border-l-4 border-[#00ffff] shadow-inner">
                <span className="text-sm text-gray-500 uppercase tracking-widest block mb-4">Örnek Kullanım:</span>
                <p className="text-2xl text-[#00ffff] font-medium mb-3">{item.examples[0].ru}</p>
                <p className="text-2xl text-[#ff0000] font-medium">{item.examples[0].tr}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}