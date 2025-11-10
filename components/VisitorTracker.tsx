'use client'

import { useEffect } from 'react'
import { trackVisitor } from '@/lib/visitor-tracker'

export default function VisitorTracker() {
  useEffect(() => {
    // Track page visit
    trackVisitor(window.location.pathname)
  }, [])

  return null
}

