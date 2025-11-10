'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, translations } from '@/lib/i18n/translations'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.id
}

// Get initial locale from localStorage or default to 'id'
function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'id'
  }
  try {
    const savedLocale = localStorage.getItem('locale') as Locale | null
    if (savedLocale && (savedLocale === 'id' || savedLocale === 'en')) {
      return savedLocale
    }
  } catch (error) {
    // localStorage might not be available
    console.error('Error reading locale from localStorage:', error)
  }
  return 'id'
}

// Create default context value
const defaultContextValue: LanguageContextType = {
  locale: 'id',
  setLocale: () => {},
  t: translations.id,
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Initialize with default, will be updated on mount
    return 'id'
  })
  const [mounted, setMounted] = useState(false)

  // Load locale from localStorage on mount (client-side only)
  useEffect(() => {
    const savedLocale = getInitialLocale()
    setLocaleState(savedLocale)
    setMounted(true)
  }, [])

  // Update html lang attribute when locale changes
  useEffect(() => {
    if (typeof document !== 'undefined' && mounted) {
      document.documentElement.lang = locale
    }
  }, [locale, mounted])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('locale', newLocale)
      } catch (error) {
        console.error('Error saving locale to localStorage:', error)
      }
    }
  }

  const contextValue: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

