'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  ArrowRight, 
  Smartphone, 
  Code, 
  Layers, 
  Zap, 
  ExternalLink, 
  Download, 
  Mail, 
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import light from '../../public/images/yogesh/light.png';
import dark from '../../public/images/yogesh/dark.png';

// --- THEME CONSTANTS ---
const colors = {
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    500: '#8b5cf6', 
    600: '#7c3aed',
    900: '#4c1d95',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    dark: 'radial-gradient(circle at top left, #1e1b4b, #0f172a)',
    soft: 'radial-gradient(circle at top left, #f5f3ff, #ffffff)',
  },
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    inverse: '#f8fafc',
  }
};

// --- DATA ---
const projects = [
  { id: 1, title: 'SocialEngine Native', category: 'iOS (Swift/SwiftUI)', desc: 'Full-featured social app with Music, Short Videos, and Admin customization.', link: '#' },
  { id: 2, title: 'Meets Calls', category: 'React Native', desc: 'Dating app featuring video calling and iOS native call integration.', link: '#' },
  { id: 3, title: 'Tattoo AI App', category: 'iOS (Swift)', desc: 'AI-powered tattoo generator using ChatGPT 4 API. Includes In-App Purchases.', link: '#' },
  { id: 4, title: 'iDispatch', category: 'iOS Development', desc: 'Driver tracking & dispatching with real-time GPS and Google Maps.', link: '#' },
  { id: 5, title: 'Harry Mander Gym', category: 'iOS (Swift)', desc: 'Gym management from scratch with Firebase & WebView integration.', link: '#' },
  { id: 6, title: 'WA Multi-Account', category: 'SwiftUI', desc: 'Productivity tool for logging into multiple WhatsApp accounts simultaneously.', link: '#' },
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
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Side: Content */}
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

            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-tight" style={{ color: textPrimary }}>
              I&apos;m <span className="text-transparent bg-clip-text" style={{ backgroundImage: colors.gradient.primary }}>Yogesh Kumar</span>
            </h1>

            <p className="mt-6 text-xl font-medium max-w-xl opacity-80" style={{ color: textSecondary }}>
              iOS Developer specializing in high-performance apps, clean architecture, and delightful user experiences. Based in Gurugram.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-full text-white font-bold shadow-xl transition hover:scale-105 active:scale-95" style={{ background: colors.gradient.primary }}>
                View My Work
              </button>
              <button className="px-8 py-4 rounded-full font-bold border-2 transition hover:bg-black/5 dark:hover:bg-white/5 active:scale-95" style={{ borderColor: colors.primary[500], color: colors.primary[500] }}>
                Download CV
              </button>
            </div>

            <div className="mt-12 flex gap-6 opacity-60">
               <Github className="w-5 h-5 cursor-pointer hover:text-purple-500 transition-colors" />
               <Linkedin className="w-5 h-5 cursor-pointer hover:text-purple-500 transition-colors" />
               <div className="flex items-center gap-2 text-sm font-bold"><MapPin className="w-4 h-4 text-purple-500" /> Gurugram, India</div>
            </div>
          </motion.div>

          {/* Right Side: Circular Professional Image */}
{/* Right Side: Circular Professional Image with Dynamic Background */}
<motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center items-center"
          >
            {/* Soft glow behind circle - intensifies in dark mode */}
            <div className={`absolute inset-0 blur-[100px] rounded-full scale-90 transition-colors duration-1000 ${isDark ? 'bg-purple-600/20' : 'bg-purple-400/10'}`} />
            
            <div className="relative group">
              {/* Spinning gradient border */}
              <div 
                className="absolute -inset-1 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                style={{ background: colors.gradient.primary, filter: 'blur(8px)' }}
              />
              
              {/* THE IMAGE CONTAINER */}
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full p-1 overflow-hidden shadow-2xl border-4 transition-all duration-700"
                style={{ 
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  // DYNAMIC BACKGROUND FOR TRANSPARENT IMAGES
                  background: isDark 
                    ? 'radial-gradient(circle at center, #2e1065 0%, #0f172a 100%)' // Deep Purple to Navy
                    : 'radial-gradient(circle at center, #f5f3ff 0%, #ede9fe 100%)'  // Very Soft Purple/White
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

              {/* Decorative Tech Badges floating around circle */}
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

      {/* 2. PROJECTS SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-black tracking-tight" style={{ color: textPrimary }}>
            Featured <span style={{ color: colors.primary[500] }}>Projects</span>
          </h2>
          <div className="h-1.5 w-20 mt-4 rounded-full" style={{ background: colors.gradient.primary }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-[2.5rem] border backdrop-blur-sm flex flex-col justify-between h-[320px] transition-all"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div>
                <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">{proj.category}</span>
                <h3 className="text-2xl font-bold mt-2" style={{ color: textPrimary }}>{proj.title}</h3>
                <p className="mt-4 text-sm leading-relaxed font-medium" style={{ color: textSecondary }}>{proj.desc}</p>
              </div>
              <Link href={proj.link} className="inline-flex items-center gap-2 text-sm font-bold text-purple-500 group-hover:gap-3 transition-all">
                Live App <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SERVICES / SKILLS SECTION */}
      <section className="py-32 px-6" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(139, 92, 246, 0.03)' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-6" style={{ color: textPrimary }}>
              What I <span style={{ color: colors.primary[500] }}>Deliver</span>
            </h2>
            <p className="text-lg font-medium opacity-70 mb-10" style={{ color: textSecondary }}>
              I focus on building apps that follow Apple&apos;s Human Interface Guidelines for the best user experience.
            </p>
            <Link href="/contact" className="text-purple-500 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Let&apos;s talk about your project <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="p-8 rounded-[2rem] border" style={{ borderColor, backgroundColor: cardBg }}>
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

      {/* 4. FOOTER / CONTACT CTA */}
      <section className="py-32 px-6">
        <motion.div 
          className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center border overflow-hidden relative"
          style={{ backgroundColor: cardBg, borderColor }}
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-10"
          >
            <Star className="w-40 h-40 fill-purple-500" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: textPrimary }}>
            Ready to build the next <br /> <span style={{ color: colors.primary[500] }}>App Store hit?</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="mailto:yogesh@example.com"
              className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 font-bold text-white transition-all shadow-xl hover:shadow-purple-500/20 active:scale-95"
              style={{ background: colors.gradient.primary }}
            >
              Hire Me <Mail className="w-5 h-5" />
            </Link>
            <button
              className="inline-flex items-center justify-center rounded-full px-10 py-4 font-bold transition-all border-2 hover:bg-black/5 active:scale-95"
              style={{ borderColor, color: textPrimary }}
            >
              Get in Touch
            </button>
          </div>

          <p className="mt-12 text-sm font-bold opacity-40 uppercase tracking-[0.3em]" style={{ color: textSecondary }}>
            © 2026 Yogesh Kumar • Gurugram
          </p>
        </motion.div>
      </section>

    </div>
  );
}