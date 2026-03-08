'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '@/lib/constants/colors'
import { useTheme } from 'next-themes'

const testimonials = [
  {
    name: 'Edward Alexander',
    role: 'Founder, Fintech Startup',
    avatar: '/images/user.png',
    rating: 5,
    headline: 'Extremely smooth and trustworthy experience',
    text: 'Paying in milestones during development made the entire process transparent and stress-free. The team delivered exactly what was promised, on time and with great quality. Their attention to detail in the fintech space was exactly what we needed.',
  },
  {
    name: 'Diana Johnston',
    role: 'Product Manager',
    avatar: '/images/user.png',
    rating: 5,
    headline: 'Clear communication and solid execution',
    text: 'From planning to delivery, everything was well-structured. The team understood our product deeply and translated it into a scalable digital solution. We saw an immediate 40% increase in user retention after the new launch.',
  },
  {
    name: 'Lauren Contreras',
    role: 'Business Consultant',
    avatar: '/images/user.png',
    rating: 5,
    headline: 'A team you can rely on',
    text: 'Professional, responsive, and highly skilled. Working with Catenally felt like working with an in-house tech team rather than an external vendor. They are truly partners in growth, not just service providers.',
  },
]

export default function TestimonialsSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [active, setActive] = useState<number>(0) 
  const [direction, setDirection] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setActive((prev: number) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handlePage = (newIndex: number) => {
    setDirection(newIndex > active ? 1 : -1)
    setActive(newIndex)
  }

  const t = testimonials[active]

  const sectionBg = isDark ? colors.background.dark : colors.background.primary
  const cardBg = isDark ? 'rgba(30, 41, 59, 0.4)' : '#ffffff'
  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'

  return (
    <section className="py-32 relative overflow-hidden" style={{ background: sectionBg }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ 
              backgroundColor: isDark ? colors.primary[900] + '40' : colors.primary[100], 
              color: colors.primary[500] 
            }}>
            Success Stories
          </span>
          <h2 className="text-4xl md:text-4xl font-black tracking-tight" style={{ color: textPrimary }}>
            Trusted by <span style={{ color: colors.primary[500] }}>Visionaries</span>
          </h2>
        </motion.div>

        <div className="relative min-h-[500px] md:min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[3rem] border grid md:grid-cols-[320px_1fr] overflow-hidden backdrop-blur-xl"
              style={{
                backgroundColor: cardBg,
                borderColor: borderColor,
                boxShadow: isDark ? '0 50px 100px -30px rgba(0,0,0,0.4)' : '0 50px 100px -30px rgba(0,0,0,0.06)',
              }}
            >
              <div className="p-12 flex flex-col items-center md:items-start text-center md:text-left justify-center bg-gradient-to-b from-transparent to-black/[0.02] dark:to-white/[0.02] border-b md:border-b-0 md:border-r"
                style={{ borderColor: borderColor }}>
                
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-24 h-24 rounded-3xl overflow-hidden mb-8 shadow-2xl ring-4 ring-purple-500/10"
                >
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </motion.div>

                <h4 className="text-xl font-bold mb-2 tracking-tight" style={{ color: textPrimary }}>{t.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest mb-8 opacity-50" style={{ color: textSecondary }}>{t.role}</p>

                <div className="flex gap-1 justify-center md:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />
                  ))}
                </div>
              </div>

              <div className="p-12 md:p-20 flex flex-col justify-center relative">
                <Quote className="absolute top-12 right-12 w-20 h-20 opacity-[0.05] text-purple-500" />
                
                <div className="relative z-10">
                  <motion.h3 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold mb-8 leading-[1.3] italic tracking-tight" 
                    style={{ color: textPrimary }}
                  >
                    "{t.headline}"
                  </motion.h3>

                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-base md:text-lg leading-[1.8] font-medium opacity-80 max-w-2xl" 
                    style={{ color: textSecondary }}
                  >
                    {t.text}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-5 gap-3">
          {testimonials.map((_, i: number) => (
            <button
              key={i}
              onClick={() => handlePage(i)}
              className="relative h-2 rounded-full transition-all duration-500 overflow-hidden bg-purple-500/20"
              style={{ width: i === active ? '30px' : '12px' }}
            >
              {i === active && (
                <motion.div 
                  layoutId="activePill"
                  className="absolute inset-0 bg-purple-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}