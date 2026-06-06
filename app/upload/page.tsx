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
        const collectionName = "sozluk"; // Artık her şey buraya gidecek
        setStatus(`${collectionName} yükleniyor... Bu işlem dosya boyutuna göre birkaç saniye sürebilir.`);

        const colRef = collection(db, collectionName);
        
        // Hızlı yükleme için verileri 400'lü paketlere bölüyoruz (Firebase kuralı)
        const batches = [];
        let batch = writeBatch(db);
        let count = 0;

        for (const item of data) {
          const newDocRef = doc(colRef);
          batch.set(newDocRef, item);
          count++;
          
          if (count % 400 === 0) {
            batches.push(batch.commit());
            batch = writeBatch(db);
          }
        }
        if (count % 400 !== 0) {
          batches.push(batch.commit());
        }

        await Promise.all(batches);
        setStatus(`BAŞARILI! ${collectionName} klasörüne tam ${count} kelime eklendi.`);
      } catch (error) {
        setStatus("Hata oluştu: " + error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-10 flex flex-col items-center pt-20">
      <h1 className="text-[#C61010] text-3xl font-black mb-2 uppercase tracking-widest">Veritabanı Yükleme Merkezi</h1>
      <p className="text-gray-500 text-sm mb-10">Bilgisayarındaki JSON dosyasını seç ve veritabanına gönder.</p>
      
      <div className="bg-[#1F1F1F] border border-[#333] p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileUpload} 
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#C61010] file:text-white hover:file:bg-[#a30d0d] transition-colors cursor-pointer mb-6" 
        />
        <p className="text-[#E0E0E0] font-semibold text-sm">{status}</p>
      </div>
    </div>
  );
}