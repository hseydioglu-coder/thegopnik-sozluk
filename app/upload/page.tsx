"use client";
import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "BURAYA_GERÇEK_API_KEY_YAZ",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default function UploadPage() {
  const [status, setStatus] = useState("");

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = JSON.parse(event.target?.result as string);
      
      // Sadece 'sozluk' koleksiyonuna gönderiyoruz
      const colRef = collection(db, "sozluk");
      
      setStatus("Yükleniyor...");
      
      for (const item of data) {
        // addDoc ile direkt sozluk klasörünün içine ekliyoruz
        await addDoc(colRef, item);
      }
      setStatus("YÜKLENDİ: " + data.length + " kelime sozluk klasörüne eklendi.");
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-20 text-white bg-[#121212] min-h-screen">
      <input type="file" onChange={handleFileUpload} className="p-10 border border-white" />
      <p className="mt-10 text-2xl font-bold">{status}</p>
    </div>
  );
}