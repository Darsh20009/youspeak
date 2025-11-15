
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 600);
    const timer2 = setTimeout(() => setCurrentStep(2), 1200);
    const timer3 = setTimeout(() => setCurrentStep(3), 1800);
    const timer4 = setTimeout(() => setIsVisible(false), 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (!isVisible) return null;

  const steps = [
    { text: 'Your', color: '#000000' },
    { text: 'English', color: '#004E89' },
    { text: 'Steps', color: '#000000' }
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F1E8] flex items-center justify-center overflow-hidden">
      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-[#004E89] blur-3xl opacity-30 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src="/logo.png"
              alt="Youspeak Logo"
              width={140}
              height={140}
              className="relative"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-6xl font-bold mb-8 text-black"
        >
          Youspeak
        </motion.h1>

        <div className="flex items-center justify-center gap-3 mb-10 min-h-[48px]">
          {steps.map((step, index) => (
            currentStep >= index && (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -30, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
                className="text-4xl font-bold tracking-wide"
                style={{ color: step.color }}
              >
                {step.text}
              </motion.span>
            )
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ width: 10, height: 10, backgroundColor: '#d1c4b0' }}
              animate={{
                width: currentStep >= i ? 50 : 10,
                height: currentStep >= i ? 10 : 10,
                backgroundColor: currentStep >= i ? '#004E89' : '#d1c4b0'
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="rounded-full"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-black/50 text-base font-medium tracking-wide"
        >
          جاري التحميل • Loading...
        </motion.div>
      </div>

      <motion.div
        className="absolute top-16 left-16 text-6xl opacity-15"
        animate={{ 
          rotate: [0, 15, -15, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        📚
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-5xl opacity-15"
        animate={{ 
          rotate: [0, -20, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4 text-4xl opacity-15"
        animate={{ 
          y: [-15, 15, -15],
          x: [-10, 10, -10]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🎓
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/4 text-5xl opacity-15"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        🌟
      </motion.div>
    </div>
  );
}
