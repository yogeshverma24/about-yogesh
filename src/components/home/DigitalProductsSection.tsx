'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  Variants
} from 'framer-motion'
import { useTheme } from 'next-themes'
import { colors } from '@/lib/constants/colors'

const easeOut = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const stats = [
  { label: 'Projects Delivered', value: 250, suffix: '+' },
  { label: 'Industries Served', value: 75, suffix: '+' },
  { label: 'Years of Experience', value: 12, suffix: '+' },
  { label: 'Client Satisfaction', value: 99, suffix: '%' },
]

export default function DigitalProductsSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const background = isDark ? colors.gradient.dark : colors.gradient.soft
  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary

  return (
    <section className="relative pt-36 pb-44 overflow-hidden" style={{ background }}>
      
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] bg-purple-500/10 -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] bg-indigo-500/10 -z-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          viewport={{ once: true }}
          className="max-w-3xl mb-24"
        >
          <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ 
              backgroundColor: isDark ? colors.primary[900] + '40' : colors.primary[100], 
              color: colors.primary[500] 
            }}>
            Our Impact
          </span>
          
          <h2 className="text-5xl md:text-5xl font-black leading-[1.2] mb-8 tracking-tight" style={{ color: textPrimary }}>
            Digital Products Built With{' '}
            <span style={{ color: colors.primary[500] }}>Purpose</span>
          </h2>

          <p className="text-xl leading-relaxed max-w-2xl" style={{ color: textSecondary }}>
            We design and engineer digital experiences that solve real business
            problems, scale reliably as your needs grow, and deliver measurable,
            long-term value.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10"
        >
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              {...stat}
              textSecondary={textSecondary}
              isDark={isDark}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

function AnimatedStat({ value, suffix, label, textSecondary, isDark }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString())
  
  const springValue = useSpring(count, { stiffness: 40, damping: 20 })

  useEffect(() => {
    if (isInView) {
      animate(count, value, { 
        duration: 2.5, 
        ease: [0.16, 1, 0.3, 1] 
      })
    }
  }, [isInView, value, count])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
      }}
      whileHover={{ y: -10 }}
      className="relative p-8 md:p-10 rounded-[2.5rem] text-center border transition-colors duration-500"
      style={{ 
        background: isDark ? 'rgba(255,255,255,0.02)' : '#ffffff',
        borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        boxShadow: isDark ? 'none' : '0 10px 30px -15px rgba(0,0,0,0.05)'
      }}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] -z-10"
        whileHover={{ opacity: 1 }}
        style={{ 
          background: `radial-gradient(circle at center, ${colors.primary[500]}10 0%, transparent 70%)` 
        }}
      />

      <div className="flex flex-col items-center justify-center">
        <motion.div
          className="text-5xl md:text-5xl font-black mb-4 bg-clip-text text-transparent flex"
          style={{ backgroundImage: colors.gradient.primary }}
        >
          <motion.span>{rounded}</motion.span>
          <span>{suffix}</span>
        </motion.div>

        <p className="text-xs md:text-sm tracking-[0.15em] font-bold uppercase"
          style={{ color: textSecondary }}>
          {label}
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colors.primary[500] + '40' }} 
      />
    </motion.div>
  )
}