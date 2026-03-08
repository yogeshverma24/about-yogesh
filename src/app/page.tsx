'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Smartphone,
  Code,
  Layers,
  Zap,
  ExternalLink,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Terminal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import light from '../../public/images/yogesh/light.png';
import dark from '../../public/images/yogesh/dark.png';
import { colors } from '@/lib/constants/colors'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const projects = [
  {
    id: 1,
    title: 'SocialEngine Native',
    category: 'iOS / Swift / SwiftUI',
    desc: 'Enterprise-grade social ecosystem with real-time video processing, encrypted messaging, and a custom creator economy module.',
    link: 'https://github.com'
  },
  {
    id: 2,
    title: 'Nexus Video Calls',
    category: 'React Native / WebRTC',
    desc: 'High-fidelity communication platform featuring native CallKit integration and ultra-low latency video streaming.',
    link: 'https://github.com'
  },
  {
    id: 3,
    title: 'InkVision AI',
    category: 'iOS / Swift / CoreML',
    desc: 'Leveraging Stable Diffusion and GPT-4 to generate custom tattoo art with AR-powered real-time visualization.',
    link: 'https://github.com'
  },
  {
    id: 4,
    title: 'Logistics Pro',
    category: 'iOS / Google Maps SDK',
    desc: 'Fleet management system with advanced geofencing, dynamic route optimization, and real-time behavioral analytics.',
    link: 'https://github.com'
  },
  {
    id: 5,
    title: 'Mander Fitness Suite',
    category: 'SwiftUI / Firebase',
    desc: 'Comprehensive health tracking suite utilizing HealthKit for biometrics and personalized AI-driven training plans.',
    link: 'https://github.com'
  },
  {
    id: 6,
    title: 'MultiSync for WA',
    category: 'SwiftUI / Productivity',
    desc: 'Advanced productivity utility allowing parallel account management with custom notification routing and biometric security.',
    link: 'https://github.com'
  },
];

const skills = [
  { icon: Smartphone, title: 'Native iOS', desc: 'Swift, SwiftUI, UIKit, and App Store deployment.' },
  { icon: Layers, title: 'Architecture', desc: 'Clean code with MVVM, VIPER, and Design Patterns.' },
  { icon: Code, title: 'Hybrid Apps', desc: 'React Native & Kotlin development for cross-platform.' },
  { icon: Zap, title: 'Real-time', desc: 'Firebase, WebSockets, and high-performance API handling.' },
];

export default function PortfolioPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const textPrimary = isDark ? colors.text.inverse : colors.text.primary;
  const textSecondary = isDark ? '#94a3b8' : colors.text.secondary;
  const cardBg = isDark ? 'rgba(30, 41, 59, 0.4)' : '#ffffff';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="w-full transition-colors duration-500" style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff' }}>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md mb-8"
              style={{ borderColor, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: textSecondary }}>Available for Projects</span>
            </motion.div>

            <h1 className="text-5xl md:text-5xl xl:text-6xl font-black tracking-tighter leading-tight" style={{ color: textPrimary }}>
              I&apos;m <span className="text-transparent bg-clip-text" style={{ backgroundImage: colors.gradient.primary }}>Yogesh Kumar</span>
            </h1>

            <p className="mt-6 text-xl font-medium max-w-xl opacity-80" style={{ color: textSecondary }}>
              Passionate about crafting seamless, beautiful, and high-performance iOS experiences. Focused on clean architecture, modern UI, and creating delightful digital products. Based in Gurugram (Haryana).            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-full text-white font-bold shadow-xl transition hover:scale-105 active:scale-95" style={{ background: colors.gradient.primary }}>
                View My Work
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <div className="flex gap-5">
                <Link href="https://github.com" target="_blank" className="transition-all hover:scale-110">
                  <Github
                    className="w-6 h-6 cursor-pointer hover:text-purple-500 transition-colors"
                    style={{ color: textPrimary }}
                  />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="transition-all hover:scale-110">
                  <Linkedin
                    className="w-6 h-6 cursor-pointer hover:text-purple-500 transition-colors"
                    style={{ color: textPrimary }}
                  />
                </Link>
              </div>

              <div className="hidden sm:block h-6 w-px bg-current opacity-20" style={{ color: textPrimary }} />

              <div className="flex items-center gap-2 text-sm font-bold tracking-tight" style={{ color: textPrimary }}>
                <MapPin className="w-5 h-5 text-purple-500" />
                <span>Gurugram, India</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center items-center"
          >
            <div className={`absolute inset-0 blur-[100px] rounded-full scale-90 transition-colors duration-1000 ${isDark ? 'bg-purple-600/20' : 'bg-purple-400/10'}`} />

            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                style={{ background: colors.gradient.primary, filter: 'blur(8px)' }}
              />

              <div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full p-1 overflow-hidden shadow-2xl border-4 transition-all duration-700"
                style={{
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  background: isDark
                    ? 'radial-gradient(circle at center, #2e1065 0%, #0f172a 100%)'
                    : 'radial-gradient(circle at center, #f5f3ff 0%, #ede9fe 100%)'
                }}
              >
                <Image
                  src={isDark ? dark : light}
                  alt="Yogesh Kumar"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-4 rounded-2xl backdrop-blur-xl border bg-white/10 shadow-xl"
                style={{ borderColor }}
              >
                <Smartphone className="w-6 h-6 text-purple-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 p-4 rounded-2xl backdrop-blur-xl border bg-white/10 shadow-xl"
                style={{ borderColor }}
              >
                <Code className="w-6 h-6 text-blue-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
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
              Professional Work
            </span>

            <h2
              className="text-4xl md:text-4xl font-black mb-6 tracking-tight"
              style={{ color: textPrimary }}
            >
              Featured
              <span className="text-purple-500"> Projects</span>
            </h2>

            <p
              className="max-w-3xl mx-auto text-lg md:text-xl font-medium mb-16 opacity-80"
              style={{ color: textSecondary }}
            >
              Passionate about building high-performance mobile apps using iOS and React Native, focused on clean architecture, modern UI, and seamless user experiences.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-[2.5rem] border backdrop-blur-sm flex flex-col justify-between h-[280px] transition-all hover:shadow-2xl hover:shadow-purple-500/5"
                style={{ backgroundColor: cardBg, borderColor }}
              >
                <div>
                  <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest bg-purple-500/5 px-3 py-1 rounded-full">{proj.category}</span>
                  <h3 className="text-2xl font-bold mt-4" style={{ color: textPrimary }}>{proj.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed font-medium opacity-80" style={{ color: textSecondary }}>{proj.desc}</p>
                </div>
                <Link
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm font-bold text-purple-500 group-hover:gap-3 transition-all"
                >                View Project <ExternalLink className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(139, 92, 246, 0.03)' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-4xl font-black tracking-tight mb-8" style={{ color: textPrimary }}>
              My Expertise <br /> <span style={{ color: colors.primary[500] }}> & Specializations</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-3xl transition-colors hover:bg-purple-500/5 group">
                <Globe className="w-8 h-8 text-purple-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg" style={{ color: textPrimary }}>Global Standards</h4>
                  <p className="py-2 opacity-60" style={{ color: textSecondary }}>Building apps that reach international markets with full localization, accessibility support, and performance optimized for users across different regions and devices.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-3xl transition-colors hover:bg-blue-500/5">
                <Terminal className="w-8 h-8 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg" style={{ color: textPrimary }}>Rapid Prototyping</h4>
                  <p className="py-2 opacity-60" style={{ color: textSecondary }}>Turning complex ideas into functional MVPs quickly using clean, scalable, and testable code with modern development practices for iOS and cross-platform apps.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="p-8 rounded-[2rem] border transition-all" style={{ borderColor, backgroundColor: cardBg }}>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500">
                  <skill.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: textPrimary }}>{skill.title}</h4>
                <p className="text-xs font-medium opacity-60 leading-relaxed" style={{ color: textSecondary }}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <motion.div
          className="max-w-7xl mx-auto rounded-[3rem] p-12 md:p-20 text-center border overflow-hidden relative"
          style={{ backgroundColor: cardBg, borderColor }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-10"
          >
            <Star className="w-40 h-40 fill-purple-500" />
          </motion.div>

          <h2
            className="text-4xl md:text-4xl font-black mb-6 tracking-tight"
            style={{ color: textPrimary }}
          >
            Let’s Build Something <br />
            <span style={{ color: colors.primary[500] }}>
              Amazing Together
            </span>
          </h2>

          <p
            className="max-w-4xl mx-auto text-lg md:text-xl font-medium opacity-80 mb-10 my-10"
            style={{ color: textSecondary }}
          >
            I'm available for freelance projects including mobile app development,
            MVP development, and scalable product builds using iOS and React Native.
            If you have an idea or product in mind, let's discuss how we can bring it
            to life.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="mailto:yogesh@example.com"
              className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 font-bold text-white transition-all shadow-xl hover:shadow-purple-500/20 hover:scale-105 active:scale-95"
              style={{ background: colors.gradient.primary }}
            >
              Start a Project <Mail className="w-5 h-5" />
            </Link>

            <button
              className="inline-flex items-center justify-center rounded-full px-10 py-4 font-bold transition-all border-2 hover:bg-black/5 hover:scale-105 active:scale-95"
              style={{ borderColor, color: textPrimary }}
            >
              Schedule a Discussion
            </button>
          </div>

          <p
            className="mt-12 text-sm font-bold opacity-40 uppercase tracking-[0.3em]"
            style={{ color: textSecondary }}
          >
            © 2026 Yogesh Kumar • Freelance Mobile Developer
          </p>
        </motion.div>
      </section>

    </div>
  );
}