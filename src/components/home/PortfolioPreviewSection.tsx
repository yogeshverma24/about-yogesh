'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { colors } from '@/lib/constants/colors'

const easeOut = [0.22, 1, 0.36, 1] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: easeOut } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20, 
    transition: { duration: 0.3, ease: 'easeIn' } 
  }
}

const categories = [
  { label: 'All Work', value: 'all' },
  { label: 'Web Platforms', value: 'web' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Mobile Apps', value: 'mobile' },
  { label: 'Products', value: 'product' },
]

const projects = [
  { id: 1, title: 'Modern SaaS Platform', category: 'web', image: '/images/portfolio/project1/project1.png' },
  { id: 2, title: 'AI Engineering Dashboard', category: 'engineering', image: '/images/portfolio/project1/project2.png' },
  { id: 3, title: 'Fintech Mobile App', category: 'mobile', image: '/images/portfolio/project1/project3.png' },
  { id: 4, title: 'Digital Product Suite', category: 'product', image: '/images/portfolio/project1/project4.png' },
  { id: 5, title: 'Cloud Infrastructure', category: 'engineering', image: '/images/portfolio/project1/project5.png' },
  { id: 6, title: 'Enterprise Web Portal', category: 'web', image: '/images/portfolio/project1/project6.png' },
]

export default function PortfolioPreviewSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [active, setActive] = useState('all')

  const sectionBackground = isDark ? colors.gradient.dark : "linear-gradient(to bottom, #ffffff, #faf5ff)"
  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const cardBackground = isDark ? "rgba(15,23,42,0.4)" : "#ffffff"
  const cardBorder = isDark ? colors.neutral[800] : colors.border.light

  const filteredProjects = useMemo(() => {
    if (active === 'all') return projects
    return projects.filter((p) => p.category === active)
  }, [active])

  return (
    <section className="py-32 overflow-hidden relative" style={{ background: sectionBackground }}>
      
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full -z-10" />

      <div className="max-w-8xl mx-auto px-6 lg:px-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: isDark ? colors.primary[900] + '40' : colors.primary[100], color: colors.primary[500] }}>
            Portfolio Preview
          </span>
          <h2 className="text-4xl md:text-4xl font-extrabold tracking-tight" style={{ color: textPrimary }}>
            A Glimpse of Our <span style={{ color: colors.primary[500] }}>Recent Work</span>
          </h2>
          <p className="mt-6 text-lg" style={{ color: textSecondary }}>
            A curated selection of projects that showcase our expertise in design, engineering, and digital innovation.
          </p>
        </motion.div>

        <div className="flex justify-center flex-wrap gap-3 mb-20">
          {categories.map((cat) => {
            const isActive = active === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className="relative px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 overflow-hidden"
                style={{ 
                  color: isActive ? "#ffffff" : textSecondary,
                  border: isActive ? 'none' : `1px solid ${cardBorder}` 
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 z-0"
                    style={{ background: colors.gradient.primary }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            )
          })}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout 
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -12 }}
                className="group relative rounded-[2rem] overflow-hidden border backdrop-blur-sm"
                style={{ background: cardBackground, borderColor: cardBorder }}
              >
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Project
                    </span>
                    <div className="w-12 h-[2px] bg-white mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </motion.div>
                </div>

                <div className="p-8">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: colors.primary[500] }}>
                    {categories.find(c => c.value === project.category)?.label}
                  </p>
                  <h3 className="text-xl font-bold tracking-tight" style={{ color: textPrimary }}>
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-20"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-bold shadow-xl transition-all hover:shadow-purple-500/20 active:scale-95"
            style={{ background: colors.gradient.primary }}
          >
            View Full Portfolio
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}