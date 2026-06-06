"use client";

import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, writeBatch } from "firebase/firestore";

// BURAYA KENDİ GERÇEK FİREBASE ŞİFRELERİNİ YAPIŞTIR
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

export default function UploadPage() {
  const [status, setStatus] = useState("");

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        const colRef = collection(db, "sozluk");
        
        setStatus(`Toplam ${data.length} kelime yükleniyor...`);
        
        for (let i = 0; i < data.length; i += 500) {
          const batch = writeBatch(db);
          const chunk = data.slice(i, i + 500);
          
          chunk.forEach((item: any) => {
            const newDocRef = doc(colRef);
            batch.set(newDocRef, item);
          });
          
          await batch.commit();
          setStatus(`İlerleme: ${i + chunk.length} / ${data.length} kelime yüklendi.`);
        }
        
        setStatus("TAMAMLANDI! Tüm sözlük tek bir klasöre başarıyla aktarıldı.");
      } catch (error) {
        console.error(error);
        setStatus("Hata oluştu, konsola (F12) bakın.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-20 flex flex-col items-center">
      <h1 className="text-3xl font-black mb-6 uppercase tracking-widest text-[#C61010]">Sözlük Yükleme Merkezi</h1>
      <div className="bg-[#1F1F1F] border border-[#333] p-10 rounded-2xl text-center max-w-md w-full">
        <input type="file" accept=".json" onChange={handleFileUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#C61010] file:text-white hover:file:bg-[#a30d0d] cursor-pointer mb-6" />
        <p className="text-xl font-bold mt-4">{status}</p>
      </div>
    </div>
  );
}