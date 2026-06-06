"use client";
import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// BURAYA KENDİ GERÇEK FİREBASE ŞİFRELERİNİ YAZMAYI UNUTMA
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
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white', padding: '2rem', fontFamily: 'sans-serif' }}>
      
      {/* Arama Çubuğu */}
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '1rem', marginBottom: '3rem', paddingTop: '2rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kelime ara (Rusça veya Türkçe)..."
          style={{ flex: 1, padding: '1.5rem', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.5rem', fontSize: '1.5rem', color: 'white' }}
        />
        <button
          onClick={searchWords}
          style={{ padding: '1.5rem 3rem', backgroundColor: '#cc0000', color: 'white', fontWeight: 'bold', borderRadius: '0.5rem', fontSize: '1.5rem', border: 'none', cursor: 'pointer' }}
        >
          Ara
        </button>
      </div>

      {/* Sonuçlar */}
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {results.map((item: any, index: number) => (
          <div key={index} style={{ padding: '2.5rem', backgroundColor: '#141414', border: '1px solid #222', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>

            {/* Rusça Kelime (Neon Mavi) */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#00ffff', margin: 0, textShadow: '0 0 10px rgba(0,255,255,0.4)' }}>
                {item.word_ru}
              </h2>
              {item.word_latin && (
                <span style={{ fontSize: '1.5rem', color: '#888', display: 'block', marginTop: '0.5rem' }}>({item.word_latin})</span>
              )}
            </div>

            <hr style={{ borderColor: '#333', margin: '1.5rem 0' }} />

            {/* Kök Fiil Alanı */}
            {(item.base_verb || item.base_verb_tr) && (
              <div style={{ backgroundColor: '#0a0a0a', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #333', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Kök Fiil:</span>
                {item.base_verb && <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00ffff', margin: 0 }}>{item.base_verb}</p>}
                {item.base_verb_tr && <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ff4444', margin: '0.5rem 0 0 0' }}>Anlamı: {item.base_verb_tr}</p>}
              </div>
            )}

            {/* Türkçe Anlam (Kırmızı) */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Türkçe Anlamı:</span>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ff0000', margin: 0, lineHeight: '1.2' }}>
                {Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : item.meaning_tr}
              </p>
            </div>

            {/* Örnek Cümleler */}
            {item.examples && item.examples.length > 0 && (
              <div style={{ padding: '1.5rem', backgroundColor: '#000', borderRadius: '0.5rem', borderLeft: '4px solid #00ffff', marginTop: '1.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>Örnek Kullanım:</span>
                <p style={{ fontSize: '1.5rem', color: '#00ffff', fontWeight: '500', margin: '0 0 0.5rem 0' }}>{item.examples[0].ru}</p>
                <p style={{ fontSize: '1.5rem', color: '#ff4444', fontWeight: '500', margin: 0 }}>{item.examples[0].tr}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}