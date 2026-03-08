'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react';

import { colors } from '@/lib/constants/colors'

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

const techStack = [
  { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
]

const experience = [
  {
    company: 'Ahead WebSoft Technologies Pvt. Ltd.',
    role: 'iOS Developer',
    period: 'May 2024 – Present',
    desc: 'Developing scalable iOS ecosystems including real-time content delivery, optimized video streaming, and high-performance mobile applications.',
    tags: ['Swift', 'AVFoundation', 'Scalability']
  },
  {
    company: 'Hastree Technologies Pvt. Ltd.',
    role: 'iOS Developer',
    period: 'Mar 2023 – May 2024',
    desc: 'Built communication platforms using Twilio and CometChat. Implemented MVVM architecture and Core Data for offline support.',
    tags: ['MVVM', 'Core Data', 'WebRTC']
  },
  {
    company: 'Codeplay Labs Private Limited',
    role: 'Full Stack Developer (Trainee)',
    period: 'Dec 2022 – Feb 2023',
    desc: 'Worked on React and Node.js based web platforms, improving frontend responsiveness and backend APIs.',
    tags: ['React', 'Node.js', 'API Design']
  },
];
export default function AboutPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const textPrimary = isDark ? '#f8fafc' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDark ? 'rgba(30,41,59,0.5)' : '#ffffff';

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="w-full transition-colors duration-500" style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff' }}>

      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-500 mb-4 block">
            The Story
          </span>

          <h1
            className="text-4xl md:text-5xl font-black mb-8 tracking-tight"
            style={{ color: textPrimary }}
          >
            About <span className="text-purple-500">Me</span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto font-medium"
            style={{ color: textSecondary }}
          >
            I’m <strong className="text-purple-500 font-bold">Yogesh Verma</strong>, an iOS developer based in Gurugram, India.
            I specialize in building scalable, high-performance mobile applications using
            <span className="dark:text-white text-slate-900"> Swift, SwiftUI, and React Native.</span>
          </p>

          <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border transition-colors duration-300"
              style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
            >
              <MapPin size={18} className="text-purple-500" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>Gurugram, India</span>
            </div>

            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border transition-colors duration-300"
              style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
            >
              <Calendar size={18} className="text-purple-500" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>5+ Years Experience</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        className="py-28 relative overflow-hidden"
        style={{
          // background: isDark ? colors.neutral[900] : 'linear-gradient(to right, #f9fafb, #ffffff)',
        }}
      >

        <div className="max-w-7xl mx-auto px-6 text-center">

        <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <span
              className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                backgroundColor: isDark ? colors.primary[900] : colors.primary[100],
                color: isDark ? colors.primary[300] : colors.primary[500],
              }}
            >
              Tech Stack
            </span>

            <h2
              className="text-4xl md:text-4xl font-black mb-6 tracking-tight"
              style={{ color: textPrimary }}
            >
              Frameworks & <br />
              <span className="text-purple-500">Modern Architecture</span>
            </h2>

            <p
              className="max-w-2xl mx-auto text-lg md:text-xl font-medium mb-16 opacity-80"
              style={{ color: textSecondary }}
            >
              I build scalable, high-performance applications using a refined stack 
              focused on speed, clean code, and seamless user experiences.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-5 gap-12 justify-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.07, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                className="flex flex-col items-center gap-3 p-4 rounded-xl"
              >
                <div
                  className="w-16 h-16 relative"
                  style={{ filter: isDark && ['Next.js', 'Git', 'Express.js'].includes(tech.name) ? 'invert(1)' : 'none' }}
                >
                  <Image src={tech.icon} alt={tech.name} fill className="object-contain" />
                </div>
                <p className="mt-2 text-sm font-semibold" style={{ color: isDark ? colors.neutral[300] : colors.text.secondary }}>
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black" style={{ color: textPrimary }}>Professional Journey</h2>
            <div className="h-1.5 w-12 bg-purple-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-16">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-white dark:border-[#0f172a] z-10" />

                  <div className="w-full md:w-[45%] ml-8 md:ml-0">
                    <div className="p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl"
                      style={{ borderColor, backgroundColor: cardBg }}>
                      <span className="text-[10px] font-bold text-purple-500 uppercase tracking-[0.2em]">
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-bold mt-2" style={{ color: textPrimary }}>
                        {exp.role}
                      </h3>
                      <p className="font-semibold text-sm mb-4" style={{ color: colors.primary[500] }}>
                        {exp.company}
                      </p>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: textSecondary }}>
                        {exp.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, index) => (
                          <span key={index} className="text-[10px] px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 font-bold" style={{ color: textSecondary }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-20" style={{ color: textPrimary }}>
            Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Performance Focused',
                desc: 'Optimizing memory usage, CPU performance, and UI rendering for smooth mobile experiences.'
              },
              {
                title: 'Clean Architecture',
                desc: 'Creating scalable applications using MVVM architecture and maintainable design patterns.'
              },
              {
                title: 'Fast Delivery',
                desc: 'Turning product ideas into production-ready mobile apps quickly with modern technologies.'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                style={{ borderColor, backgroundColor: cardBg }}
              >
                <Briefcase className="text-purple-500 mb-4 mx-auto" />
                <h4 className="text-xl font-bold mb-4" style={{ color: textPrimary }}>
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}