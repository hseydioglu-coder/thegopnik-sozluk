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
    <div className="min-h-screen bg-black text-white p-8">
      {/* Arama Çubuğu */}
      <div className="max-w-4xl mx-auto flex gap-4 mb-12 mt-10">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kelime ara (Rusça veya Türkçe)..." 
          className="flex-1 p-6 bg-neutral-900 border border-neutral-700 rounded-xl text-2xl text-white focus:outline-none focus:border-cyan-400"
        />
        <button onClick={searchWords} className="px-12 py-6 bg-red-600 text-white font-bold rounded-xl text-2xl hover:bg-red-700 transition-colors">
          Ara
        </button>
      </div>

      {/* Sonuçlar */}
      <div className="max-w-4xl mx-auto space-y-10">
        {results.map((item: any, index: number) => (
          <div key={index} className="p-10 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl flex flex-col gap-6">
            
            {/* Rusça Kelime */}
            <div>
              <h2 className="text-6xl font-black text-cyan-400">
                {item.word_ru}
              </h2>
              {item.word_latin && (
                <span className="text-2xl text-gray-500 mt-2 block">({item.word_latin})</span>
              )}
            </div>

            <hr className="border-neutral-700 my-2" />

            {/* Kök Fiil Alanı */}
            {(item.base_verb || item.base_verb_tr) && (
              <div className="bg-black p-6 rounded-xl border border-neutral-800">
                <span className="text-sm text-gray-400 uppercase tracking-widest block mb-2">Kök Fiil:</span>
                {item.base_verb && <p className="text-3xl font-bold text-cyan-400">{item.base_verb}</p>}
                {item.base_verb_tr && <p className="text-2xl font-bold text-red-500 mt-2">Anlamı: {item.base_verb_tr}</p>}
              </div>
            )}

            {/* Türkçe Anlam */}
            <div>
              <span className="text-sm text-gray-400 uppercase tracking-widest block mb-2">Türkçe Anlamı:</span>
              <p className="text-4xl font-bold text-red-500 leading-tight">
                {Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : item.meaning_tr}
              </p>
            </div>

            {/* Örnek Cümleler */}
            {item.examples && item.examples.length > 0 && (
              <div className="mt-4 p-8 bg-black rounded-xl border-l-4 border-cyan-400">
                <span className="text-sm text-gray-500 uppercase tracking-widest block mb-4">Örnek Kullanım:</span>
                <p className="text-2xl text-cyan-400 font-medium mb-3">{item.examples[0].ru}</p>
                <p className="text-2xl text-red-500 font-medium">{item.examples[0].tr}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}