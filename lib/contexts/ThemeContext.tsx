'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'
type Language = 'ar' | 'en'

interface ThemeContextType {
  theme: Theme
  language: Language
  toggleTheme: () => void
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light'
    const savedLanguage = (localStorage.getItem('language') as Language) || 'en'
    
    setTheme(savedTheme)
    setLanguageState(savedLanguage)
    
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
      document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr')
      document.documentElement.setAttribute('lang', savedLanguage)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (mounted) {
      localStorage.setItem('theme', newTheme)
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
    }
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar'
    setLanguageState(newLanguage)
    setLanguage(newLanguage)
  }

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (mounted) {
      localStorage.setItem('language', lang)
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
        document.documentElement.setAttribute('lang', lang)
      }
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, toggleLanguage, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
