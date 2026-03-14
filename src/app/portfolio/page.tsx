'use client'

import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'
import {
  Rocket, Building2, Landmark, HeartPulse,
  ShoppingBag, GraduationCap, Cloud, Megaphone,
  Layers, Compass,
  Globe,
  Smartphone,
  Zap,
} from 'lucide-react'
import { colors } from '@/lib/constants/colors'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay },
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
  { label: 'Web Platforms', value: 'web' }, // DelegateSpace, Catanarry, DeleateHost, VKS 
  { label: 'MVP', value: 'mvp' }, // Spinny Clone, Social Media Clone, Bundle script, just home
  { label: 'Mobile Apps', value: 'mobile' }, // Music Player, Social Media app, Car Play, Muslim pro
  { label: 'Products', value: 'product' }, // DelegateCampus, Task Manager
]

const projects = [
  { id: 1, title: 'DelegateSpaces', category: 'web', image: '/images/portfolio/web/delegatespace.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 2, title: 'Catenally', category: 'web', image: '/images/portfolio/web/catenally.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 3, title: 'DelegateHost', category: 'web', image: '/images/portfolio/web/delegatehost.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 4, title: 'VSK Global Infotech', category: 'web', image: '/images/portfolio/web/vks.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },

  
  { id: 5, title: 'Spinny Clone', category: 'mvp', image: '/images/portfolio/mvp/bundles.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 6, title: 'Bundle Script', category: 'mvp', image: '/images/portfolio/mvp/spinny.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 7, title: 'Just Home', category: 'mvp', image: '/images/portfolio/mvp/justhome.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },

  { id: 8, title: 'Campus', category: 'product', image: '/images/portfolio/product/campus.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 9, title: 'Task Manager', category: 'product', image: '/images/portfolio/product/taskmanager.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },

  { id: 10, title: 'Social Media', category: 'mobile', image: '/images/portfolio/mobile/social.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 11, title: 'Carplay', category: 'mobile', image: '/images/portfolio/mobile/carplay.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
  { id: 12, title: 'Music Player', category: 'mobile', image: '/images/portfolio/mobile/music.png', description: 'We deliver solutions that offer high levels of consistency in quality and performance.' },
]

export default function OurWorks() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';

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

      <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto text-center overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp}>

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-500 mb-4 block">
            Selected Work
          </span>

          <h1
            className="text-5xl md:text-5xl font-black mb-8 tracking-tight leading-[1.1]"
            style={{ color: textPrimary }}
          >
            The <span className="text-purple-500">Portfolio.</span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-medium"
            style={{ color: textSecondary }}
          >
            A curated collection of projects showcasing my work in
            <strong className="text-purple-500 font-bold"> web platforms, mobile applications, and scalable software solutions</strong>.
            Each project reflects my focus on performance, clean architecture, and modern user experiences.
          </p>

          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">

            <div
              className="flex items-center gap-2.5 px-5 py-2 rounded-full border transition-all duration-300 hover:border-purple-500/50"
              style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
            >
              <Globe size={16} className="text-purple-500" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>
                Web Platforms
              </span>
            </div>

            <div
              className="flex items-center gap-2.5 px-5 py-2 rounded-full border transition-all duration-300 hover:border-purple-500/50"
              style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
            >
              <Smartphone size={16} className="text-purple-500" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>
                Mobile Apps
              </span>
            </div>

            <div
              className="flex items-center gap-2.5 px-5 py-2 rounded-full border transition-all duration-300 hover:border-purple-500/50"
              style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
            >
              <Zap size={16} className="text-purple-500" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>
                Scalable Solutions
              </span>
            </div>

          </div>

        </motion.div>

      </section>

      <section
        className="py-28"
        style={{ background: isDark ? colors.background.dark : colors.background.secondary }}
      >
        <div className="max-w-8xl mx-auto px-6 text-center px-25">

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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-10">
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
                  whileHover={{ y: -8 }}
                  className="group text-left rounded-3xl border overflow-hidden"
                  style={{
                    borderColor: isDark ? colors.neutral[700] : colors.border.DEFAULT,
                    background: isDark ? colors.neutral[800] : colors.background.primary,
                  }}
                >

                  <Link href={`/projects/${project.id}`} target="_blank">

                    <div className="relative h-[270px] overflow-hidden">

                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      <motion.div
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6"
                      >

                        <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          View Project
                        </span>

                        <div className="w-12 h-[2px] bg-white mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                      </motion.div>

                    </div>

                    <div className="p-6">

                      <h3
                        className="text-2xl font-semibold mb-3"
                        style={{ color: isDark ? colors.text.inverse : colors.text.primary }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="leading-relaxed"
                        style={{ color: isDark ? colors.neutral[400] : colors.text.secondary }}
                      >
                        {project.description}
                      </p>

                    </div>

                  </Link>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  )
}