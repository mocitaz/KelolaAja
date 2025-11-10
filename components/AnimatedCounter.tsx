'use client'

import { useState, useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  value: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({ value, duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  // Extract numeric value and suffix (like "90%" -> 90 and "%")
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0
  const suffix = value.replace(/\d/g, '') // Get non-numeric characters

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const startValue = 0
    const endValue = numericValue

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, numericValue, duration])

  return (
    <div ref={elementRef} className={className}>
      {count}{suffix}
    </div>
  )
}

