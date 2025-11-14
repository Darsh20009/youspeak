
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // تختفي بعد 2.5 ثانية

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#F5F1E8] via-white to-[#E8E4D8] animate-fade-out">
      <div className="text-center animate-pulse">
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="Youspeak Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#004E89] to-[#0077BE] bg-clip-text text-transparent mb-2">
          Youspeak
        </h1>
        <p className="text-lg text-black">Master English Today</p>
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-[#004E89] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#004E89] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[#004E89] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
