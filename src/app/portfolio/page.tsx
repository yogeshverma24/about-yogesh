'use client'

import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'
import {
  Rocket, Building2, Landmark, HeartPulse,
  ShoppingBag, GraduationCap, Cloud, Megaphone,
  Layers, Compass,
} from 'lucide-react'
import { colors } from '@/lib/constants/colors'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'


const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
}

const slideInLeft = {
  hidden: { opacity: 0, x: -44 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
}

const slideInRight = {
  hidden: { opacity: 0, x: 44 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
}


const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}
const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] as const, 
      delay: i * 0.08 
    },
  }),
  exit: { 
    opacity: 0, 
    y: -12, 
    scale: 0.97, 
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' as const 
    } 
  },
}

const stats = [
  { label: 'Projects Delivered', value: 120 },
  { label: 'Industries Served', value: 40 },
  { label: 'Years of Experience', value: 8 },
  { label: 'Client Satisfaction', value: 95, suffix: '%' },
]

const categories = [
  { label: 'All Work', value: 'all' },
  { label: 'Web Platforms', value: 'web' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Mobile Apps', value: 'mobile' },
  { label: 'Products', value: 'product' },
]

const projects = [
  { id: 1, title: 'Our Project Title', category: 'web',         image: '/images/portfolio/project1/project1.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 2, title: 'Our Project Title', category: 'engineering', image: '/images/portfolio/project1/project2.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 3, title: 'Our Project Title', category: 'mobile',      image: '/images/portfolio/project1/project3.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 4, title: 'Our Project Title', category: 'product',     image: '/images/portfolio/project1/project4.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 5, title: 'Our Project Title', category: 'engineering', image: '/images/portfolio/project1/project5.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 6, title: 'Our Project Title', category: 'web',         image: '/images/portfolio/project1/project6.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
]

export default function OurWorks() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary

  const [active, setActive] = useState('all')
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    stats.forEach((stat, index) => {
      let current = 0
      const increment = Math.ceil(stat.value / 60)
      const interval = setInterval(() => {
        current += increment
        if (current >= stat.value) { current = stat.value; clearInterval(interval) }
        setCounts(prev => { const u = [...prev]; u[index] = current; return u })
      }, 25)
    })
  }, [])

  const filteredProjects = useMemo(() => (
    active === 'all' ? projects : projects.filter(p => p.category === active)
  ), [active])

  return (
    <div
      style={{
        background: isDark ? colors.background.dark : colors.background.primary,
        color: isDark ? colors.text.inverse : colors.text.primary,
      }}
    >

{/* --- MATCHED HERO SECTION --- */}
<section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto text-center overflow-hidden">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-500 mb-4 block">
            The Portfolio
          </span>

          <h1 className="text-5xl md:text-5xl font-black mb-8 tracking-tight leading-[1.1]" style={{ color: textPrimary }}>
            Digital <span className="text-purple-500">Showcase.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-medium" style={{ color: textSecondary }}>
            A selection of my best work in 
            <strong className="text-purple-500 font-bold"> Web Engineering and Mobile Development</strong>. 
            Built with a focus on performance, scalability, and clean code.
          </p>
        </motion.div>
      </section>

      <section
        className="py-28"
        style={{ background: isDark ? colors.background.dark : colors.background.secondary }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2
              className="text-4xl font-extrabold mb-3"
              style={{ color: isDark ? colors.text.inverse : colors.text.primary }}
            >
              Our <span style={{ color: colors.primary[500] }}>Works</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-15" style={{ color: isDark ? colors.neutral[400] : colors.text.secondary }}>
              A curated selection of work showcasing our approach to design, engineering, and product thinking across industries.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center flex-wrap gap-4 mb-12"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
          >
            {categories.map(cat => (
              <motion.button
                key={cat.value}
                variants={staggerItem}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActive(cat.value)}
                className="px-7 py-3 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: active === cat.value ? colors.primary[500] : isDark ? colors.neutral[800] : colors.background.primary,
                  color: active === cat.value ? colors.text.inverse : isDark ? colors.neutral[300] : colors.text.secondary,
                  border: `1px solid ${active === cat.value ? colors.primary[500] : isDark ? colors.neutral[700] : colors.border.DEFAULT}`,
                  boxShadow: active === cat.value ? '0 4px 14px rgba(168,85,247,0.3)' : 'none',
                }}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-14">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  custom={i}
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                  className="group text-left rounded-3xl border"
                  style={{
                    borderColor: isDark ? colors.neutral[700] : colors.border.DEFAULT,
                    background: isDark ? colors.neutral[800] : colors.background.primary,
                  }}
                >
                  <div className="relative h-[300px] rounded-3xl overflow-hidden mb-5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />
                  </div>

                  <h3
                    className="text-2xl font-semibold mb-3 px-4"
                    style={{ color: isDark ? colors.text.inverse : colors.text.primary }}
                  >
                    {project.title}
                  </h3>

                  <p className="leading-relaxed px-4 mb-5" style={{ color: isDark ? colors.neutral[400] : colors.text.secondary }}>
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  )
}