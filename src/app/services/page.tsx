'use client'

import Image from 'next/image'
import { CheckCircle, Code2, Smartphone, Globe, Database, Cpu, Zap } from 'lucide-react'
import { colors } from '@/lib/constants/colors'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

// Animation Constants
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
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 44 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

const myServices = [
  {
    title: 'Full Stack Web Development',
    subtitle: 'MERN Stack Specialist',
    description:
      'With over 5 years of experience, I build robust, SEO-optimized, and highly scalable web applications. From architecting MongoDB schemas to crafting pixel-perfect React frontends, I ensure end-to-end excellence.',
    points: ['Enterprise React & Next.js Apps', 'Scalable Node.js/Express Backends', 'Real-time WebSockets Integration', 'Secure REST & GraphQL APIs'],
    icon: Globe,
    image: '/images/yogesh/services1.png',
  },
  {
    title: 'Mobile App Development',
    subtitle: 'Native & Cross-Platform',
    description:
      'I specialize in building high-performance mobile ecosystems. Whether it is a native Swift iOS app or a multi-platform React Native solution, I focus on 60FPS animations and offline-first capabilities.',
    points: ['Native iOS (Swift/SwiftUI)', 'Cross-Platform React Native', 'Android Development', 'App Store & Play Store Deployment'],
    icon: Smartphone,
    image: '/images/yogesh/services2.png',
  },
  {
    title: 'System Architecture',
    subtitle: 'Cloud & Database Design',
    description:
      'Expertise in designing systems that don’t just work, but scale. I handle database optimization (NoSQL/SQL) and cloud infrastructure to ensure your product handles thousands of concurrent users.',
    points: ['Database Modeling (MongoDB/PostgreSQL)', 'AWS & Vercel Cloud Deployment', 'Microservices Architecture', 'CI/CD Pipeline Automation'],
    icon: Cpu,
    image: '/images/yogesh/services3.png',
  },
]

const coreCompetencies = [
  { title: 'Modern Frontend', description: 'Expertise in React 18, Next.js 14, and Tailwind CSS for high-speed web interfaces.', icon: Zap },
  { title: 'Backend Power', description: 'Building secure, high-concurrency servers using Node.js and Express.', icon: Database },
  { title: 'Mobile Native', description: 'Deep knowledge of iOS internals, Swift, and Mobile UI/UX patterns.', icon: Smartphone },
  { title: 'Clean Code', description: 'Adhering to SOLID principles and MVVM architecture for maintainable codebases.', icon: Code2 },
]

export default function WhatWeDo() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';

  return (
    <div style={{ background: isDark ? colors.background.dark : colors.background.primary, color: textPrimary }}>
      

      {/* --- MATCHED SERVICES HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto text-center overflow-hidden">
        {/* Subtle Background Glow to match the site's depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Subtle Label - Matching "The Story" style */}
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-500 mb-4 block">
            Expertise & Solutions
          </span>

          <h1
            className="text-5xl md:text-5xl font-black mb-8 tracking-tight leading-[1.1]"
            style={{ color: textPrimary }}
          >
            Full Stack <span className="text-purple-500">Mastery.</span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-medium"
            style={{ color: textSecondary }}
          >
            With <strong className="text-purple-500 font-bold">5+ years of professional experience</strong>, I architect and deploy 
            high-performance digital products. From MERN stack web ecosystems to native mobile applications, I deliver 
            <span className="dark:text-white text-slate-900"> end-to-end technical excellence.</span>
          </p>

          {/* Clean Tech Badges - Matching the About Me layout */}
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
            <div
              className="flex items-center gap-2.5 px-5 py-2 rounded-full border transition-all duration-300 hover:border-purple-500/50"
              style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
            >
              <Globe size={16} className="text-purple-500" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>MERN Stack</span>
            </div>

            <div
              className="flex items-center gap-2.5 px-5 py-2 rounded-full border transition-all duration-300 hover:border-purple-500/50"
              style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
            >
              <Smartphone size={16} className="text-purple-500" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>iOS & Android</span>
            </div>

            <div
              className="flex items-center gap-2.5 px-5 py-2 rounded-full border transition-all duration-300 hover:border-purple-500/50"
              style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
            >
              <Zap size={16} className="text-purple-500" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>High Performance</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-48">
          {myServices.map((service, index) => {
            const isReverse = index % 2 !== 0
            const Icon = service.icon

            return (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                <motion.div 
                  className={`relative ${isReverse ? 'lg:order-2' : ''}`}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                  variants={isReverse ? slideInRight : slideInLeft}
                >
                  <div className="relative group">
                    <div className="absolute -inset-4  rounded-[2rem] blur-2xl  transition duration-500" />
                    <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden ">
                      <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 " />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className={isReverse ? 'lg:order-1' : ''}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={isReverse ? slideInLeft : slideInRight}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Icon className="text-purple-500" size={24} />
                    </div>
                    <span className="text-sm font-bold text-purple-500 uppercase tracking-widest">{service.subtitle}</span>
                  </div>
                  
                  <h3 className="text-4xl font-black mb-6 leading-tight">{service.title}</h3>
                  <p className="text-lg leading-relaxed mb-8" style={{ color: textSecondary }}>{service.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.points.map((point, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-purple-500 shrink-0" />
                        <span className="text-sm font-semibold">{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>
      </section>

      {/* CORE COMPETENCIES GRID */}
      <section className="py-30 bg-slate-50/50 dark:bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-4xl font-black mb-16">Technical Mastery</h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {coreCompetencies.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div 
                  key={i} 
                  variants={staggerItem}
                  whileHover={{ y: -10 }}
                  // className="p-8 rounded-3xl border transition-all duration-300"
                  // style={{ 
                  //   backgroundColor: isDark ? colors.neutral[800] : '#ffffff',
                  //   borderColor: isDark ? colors.neutral[700] : 'rgba(0,0,0,0.05)'
                  // }}
                >
                  <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Icon className="text-purple-500" size={24} />
                  </div>
                  <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

    </div>
  )
}