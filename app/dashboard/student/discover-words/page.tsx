'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Star, Sparkles, Brain, Trophy, ArrowRight } from 'lucide-react'

interface Word {
  word: string
  arabic: string
  example: string
}

export default function DiscoverWordsPage() {
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showExample, setShowExample] = useState(false)

  useEffect(() => {
    loadWords()
  }, [level])

  const loadWords = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/words/discover?level=${level}`)
      const data = await res.json()
      setWords(data.words)
      setCurrentIndex(0)
      setShowExample(false)
    } catch (error) {
      console.error('Error loading words:', error)
    }
    setLoading(false)
  }

  const handleResponse = async (known: boolean) => {
    const currentWord = words[currentIndex]
    
    if (known) {
      setScore(score + 10)
      setStreak(streak + 1)
      
      await fetch('/api/words/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: currentWord.word,
          arabic: currentWord.arabic,
          example: currentWord.example,
          known: true
        })
      })
    } else {
      setStreak(0)
    }

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowExample(false)
    } else {
      loadWords()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 flex items-center justify-center">
        <div className="text-white text-2xl flex items-center gap-3">
          <Sparkles className="animate-spin h-8 w-8" />
          <span>جاري تحميل الكلمات...</span>
        </div>
      </div>
    )
  }

  const currentWord = words[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 p-3 rounded-xl">
              <Brain className="h-8 w-8 text-purple-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">اكتشف الكلمات الجديدة</h1>
              <p className="text-purple-100">Discover New Words</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-center">
              <Star className="h-6 w-6 mx-auto mb-1 text-yellow-300" />
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-xs text-purple-100">النقاط</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-center">
              <Trophy className="h-6 w-6 mx-auto mb-1 text-orange-300" />
              <div className="text-2xl font-bold">{streak}</div>
              <div className="text-xs text-purple-100">التتابع</div>
            </div>
          </div>
        </motion.div>

        {/* Level Selector */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mt-4 justify-center"
        >
          {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                level === lvl
                  ? 'bg-white text-purple-600 shadow-xl scale-110'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {lvl === 'beginner' && 'مبتدئ'}
              {lvl === 'intermediate' && 'متوسط'}
              {lvl === 'advanced' && 'متقدم'}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Word Card */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {currentWord && (
            <motion.div
              key={currentIndex}
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0, rotateY: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30 -z-10" />

              {/* Word */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-2xl mb-6">
                  <h2 className="text-6xl font-bold">{currentWord.word}</h2>
                </div>

                {/* Progress */}
                <div className="flex justify-center gap-2 mb-8">
                  {words.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex
                          ? 'w-12 bg-purple-600'
                          : idx < currentIndex
                          ? 'w-2 bg-green-400'
                          : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Arabic Meaning */}
                <div className="mb-8">
                  <p className="text-3xl font-bold text-gray-800 mb-2" dir="rtl">
                    {currentWord.arabic}
                  </p>
                </div>

                {/* Example Toggle */}
                <button
                  onClick={() => setShowExample(!showExample)}
                  className="mb-6 flex items-center gap-2 mx-auto text-purple-600 hover:text-purple-800 font-semibold"
                >
                  <Sparkles className="h-5 w-5" />
                  {showExample ? 'إخفاء المثال' : 'عرض المثال'}
                </button>

                {showExample && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="bg-purple-50 rounded-xl p-6 mb-8"
                  >
                    <p className="text-lg text-gray-700 italic">"{currentWord.example}"</p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleResponse(false)}
                    className="flex-1 max-w-xs bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 transition-colors"
                  >
                    <X className="h-8 w-8" />
                    <span>لا أعرفها</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleResponse(true)}
                    className="flex-1 max-w-xs bg-green-500 hover:bg-green-600 text-white px-8 py-6 rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 transition-colors"
                  >
                    <Check className="h-8 w-8" />
                    <span>أعرفها!</span>
                  </motion.button>
                </div>

                {/* Tips */}
                <div className="mt-8 text-sm text-gray-500">
                  <p>💡 الكلمات التي تعرفها ستضاف لقائمتك الخاصة تلقائياً</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
