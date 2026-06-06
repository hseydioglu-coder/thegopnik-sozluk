"use client";

import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Firebase Kurulumu
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [words, setWords] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const initialForm = {
    word_ru: "", word_latin: "", meaning_tr: "", cultural_context: "",
    literal_translation_tr: "", severity_level: "", base_verb: "",
    base_verb_tr: "", search_keywords: "", example_ru: "", example_tr: ""
  };
  const [formData, setFormData] = useState(initialForm);

  // ŞİFRE KONTROLÜ (Buradaki 123456'yı istediğin şifreyle değiştir)
  const handleLogin = () => {
    if (password === "Xzx+1461!AHS") {
      setIsAuthenticated(true);
      fetchWords();
    } else {
      alert("Hatalı Şifre!");
    }
  };

  const fetchWords = async () => {
    const colRef = collection(db, "sozluk");
    const snapshot = await getDocs(colRef);
    const wordsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setWords(wordsList);
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    
    // Veriyi Firebase formatına hazırlama
    const dataToSave = {
      word_ru: formData.word_ru,
      word_latin: formData.word_latin,
      meaning_tr: formData.meaning_tr.split(",").map(s => s.trim()), // Virgülle ayırıp dizi yapar
      cultural_context: formData.cultural_context,
      literal_translation_tr: formData.literal_translation_tr,
      severity_level: formData.severity_level,
      base_verb: formData.base_verb,
      base_verb_tr: formData.base_verb_tr,
      search_keywords: formData.search_keywords.split(",").map(s => s.trim()),
      examples: formData.example_ru ? [{ ru: formData.example_ru, tr: formData.example_tr }] : []
    };

    try {
      if (editingId) {
        // Güncelleme
        const docRef = doc(db, "sozluk", editingId);
        await updateDoc(docRef, dataToSave);
        alert("Kelime başarıyla güncellendi!");
      } else {
        // Yeni Ekleme
        const colRef = collection(db, "sozluk");
        await addDoc(colRef, dataToSave);
        alert("Yeni kelime başarıyla eklendi!");
      }
      setFormData(initialForm);
      setEditingId(null);
      fetchWords();
    } catch (error) {
      console.error("Kayıt hatası:", error);
      alert("Hata oluştu! Firebase veri yazma izniniz açık mı?");
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      word_ru: item.word_ru || "",
      word_latin: item.word_latin || "",
      meaning_tr: Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : (item.meaning_tr || ""),
      cultural_context: item.cultural_context || "",
      literal_translation_tr: item.literal_translation_tr || "",
      severity_level: item.severity_level || "",
      base_verb: item.base_verb || "",
      base_verb_tr: item.base_verb_tr || "",
      search_keywords: Array.isArray(item.search_keywords) ? item.search_keywords.join(", ") : (item.search_keywords || ""),
      example_ru: item.examples?.[0]?.ru || "",
      example_tr: item.examples?.[0]?.tr || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, word: string) => {
    if (window.confirm(`"${word}" kelimesini silmek istediğinize emin misiniz?`)) {
      await deleteDoc(doc(db, "sozluk", id));
      fetchWords();
    }
  };

  // Şifre Ekranı
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="p-8 bg-[#111] border border-[#333] rounded-2xl shadow-2xl text-center">
          <h1 className="text-3xl font-black text-[#C61010] mb-6">YÖNETİM ERİŞİMİ</h1>
          <input 
            type="password" 
            placeholder="Şifrenizi girin..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full p-4 bg-black border border-[#444] rounded text-white text-center mb-4 focus:border-[#C61010] outline-none"
          />
          <button onClick={handleLogin} className="w-full p-4 bg-[#C61010] text-white font-bold rounded hover:bg-red-700">
            GİRİŞ YAP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sol Taraf - Form (Ekleme/Düzenleme) */}
        <div className="w-full lg:w-1/3 bg-[#141414] border border-[#333] p-6 rounded-2xl h-fit sticky top-8">
          <h2 className="text-2xl font-black text-[#00ffff] mb-6">
            {editingId ? "✏️ KELİMEYİ DÜZENLE" : "➕ YENİ KELİME EKLE"}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div><label className="text-xs text-gray-500">Rusça Kelime (*)</label><input required name="word_ru" value={formData.word_ru} onChange={handleInputChange} className="w-full p-3 bg-black border border-[#333] rounded text-white" /></div>
            <div><label className="text-xs text-gray-500">Okunuşu (Latin)</label><input name="word_latin" value={formData.word_latin} onChange={handleInputChange} className="w-full p-3 bg-black border border-[#333] rounded text-white" /></div>
            <div><label className="text-xs text-gray-500">Türkçe Anlamı (Birden fazlaysa virgülle ayır) (*)</label><input required name="meaning_tr" value={formData.meaning_tr} onChange={handleInputChange} className="w-full p-3 bg-black border border-[#333] rounded text-[#ff3333] font-bold" /></div>
            <div><label className="text-xs text-gray-500">Kültürel Açıklama</label><textarea name="cultural_context" value={formData.cultural_context} onChange={handleInputChange} className="w-full p-3 bg-black border border-[#333] rounded text-white h-24" /></div>
            <div><label className="text-xs text-gray-500">Birebir Çeviri</label><input name="literal_translation_tr" value={formData.literal_translation_tr} onChange={handleInputChange} className="w-full p-3 bg-black border border-[#333] rounded text-white" /></div>
            <div className="flex gap-4">
              <div className="w-1/2"><label className="text-xs text-gray-500">Kök Fiil (Ru)</label><input name="base_verb" value={formData.base_verb} onChange={handleInputChange} className="w-full p-3 bg-black border border-[#333] rounded text-white" /></div>
              <div className="w-1/2"><label className="text-xs text-gray-500">Kök Fiil (Tr)</label><input name="base_verb_tr" value={formData.base_verb_tr} onChange={handleInputChange} className="w-full p-3 bg-black border border-[#333] rounded text-white" /></div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3"><label className="text-xs text-gray-500">Seviye (1-5)</label><input name="severity_level" value={formData.severity_level} onChange={handleInputChange} className="w-full p-3 bg-black border border-[#333] rounded text-center font-bold text-[#ff3333]" /></div>
              <div className="w-2/3"><label className="text-xs text-gray-500">Arama Anahtar Kelimeleri</label><input name="search_keywords" value={formData.search_keywords} onChange={handleInputChange} placeholder="amcık, sikiş, vb..." className="w-full p-3 bg-black border border-[#333] rounded text-white text-xs" /></div>
            </div>
            <div className="p-4 bg-[#1a1a1a] border border-[#444] rounded">
              <label className="text-xs text-gray-500 font-bold block mb-2">Örnek Cümle Ekle</label>
              <input name="example_ru" value={formData.example_ru} onChange={handleInputChange} placeholder="Rusça örnek..." className="w-full p-2 bg-black border border-[#333] rounded text-white mb-2 text-sm" />
              <input name="example_tr" value={formData.example_tr} onChange={handleInputChange} placeholder="Türkçe çevirisi..." className="w-full p-2 bg-black border border-[#333] rounded text-white text-sm" />
            </div>
            
            <div className="flex gap-2 pt-4">
              <button type="submit" className="flex-1 p-4 bg-[#C61010] text-white font-bold rounded-xl hover:bg-red-700">
                {editingId ? "GÜNCELLE" : "KAYDET"}
              </button>
              {editingId && (
                <button type="button" onClick={() => {setEditingId(null); setFormData(initialForm)}} className="p-4 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600">
                  İPTAL
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Sağ Taraf - Veritabanı Listesi */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-400">MEVCUT KELİMELER ({words.length})</h2>
            <input 
              type="text" 
              placeholder="Kelime Ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 bg-[#111] border border-[#333] rounded-lg text-white w-64 focus:border-[#00ffff] outline-none"
            />
          </div>

          <div className="space-y-4">
            {words.filter(w => w.word_ru?.toLowerCase().includes(searchTerm.toLowerCase()) || Array.isArray(w.meaning_tr) ? w.meaning_tr.join().toLowerCase().includes(searchTerm.toLowerCase()) : w.meaning_tr?.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-[#111] border border-[#222] rounded-xl hover:border-[#444] transition-colors">
                <div>
                  <h3 className="text-xl font-bold text-[#00ffff]">{item.word_ru}</h3>
                  <p className="text-sm text-[#ff3333]">{Array.isArray(item.meaning_tr) ? item.meaning_tr.join(", ") : item.meaning_tr}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="px-4 py-2 bg-blue-600 text-white rounded font-bold text-xs hover:bg-blue-500">DÜZENLE</button>
                  <button onClick={() => handleDelete(item.id, item.word_ru)} className="px-4 py-2 bg-red-900 text-white rounded font-bold text-xs hover:bg-red-700">SİL</button>
                </div>
              </div>
            ))}
            {words.length === 0 && <p className="text-gray-500">Veritabanında henüz kelime yok.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}