"use client";
import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  // Buraya kendi gerçek bilgilerin kalsın
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default function UploadPage() {
  const [status, setStatus] = useState("");

  // Yükleme fonksiyonunu bu mantıkla değiştir:
const handleFileUpload = async (e: any) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = async (event) => {
    const data = JSON.parse(event.target?.result as string);
    const db = getFirestore(app);
    const colRef = collection(db, "sozluk");
    
    // Veriyi 500'lük parçalara bölüyoruz
    for (let i = 0; i < data.length; i += 500) {
      const batch = writeBatch(db); // Toplu işlem başlat
      const chunk = data.slice(i, i + 500);
      
      chunk.forEach((item: any) => {
        const docRef = doc(colRef); // Yeni bir doküman referansı oluştur
        batch.set(docRef, item);
      });
      
      await batch.commit(); // 500 tanesini tek saniyede gönder
      setStatus(`Yükleniyor: ${i + chunk.length} / ${data.length}`);
    }
    setStatus("TAMAMLANDI!");
  };
  reader.readAsText(file);
};

  return (
    <div className="p-20 text-white bg-[#121212] min-h-screen">
      <h1 className="text-2xl mb-5">Veri Yükleyici</h1>
      <input type="file" onChange={handleFileUpload} className="p-5 border border-white" />
      <p className="mt-10 text-xl font-bold">{status}</p>
    </div>
  );
}