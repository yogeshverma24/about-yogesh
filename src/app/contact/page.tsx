'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Mail, Phone, MapPin, Send,
  MessageSquare, ShieldCheck, Clock,
  Linkedin, Github, Twitter
} from 'lucide-react'
import { colors } from '@/lib/constants/colors'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

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

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Me',
    detail: 'itsyogeshverma12@gmail.com',
    sub: 'Quick response within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Location',
    detail: 'Gurugram, Haryana',
    sub: 'India (GMT +5:30)',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    detail: 'yogesh-verma-06',
    sub: 'Let’s connect professionally',
  },
]

export default function ContactUs() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const cardBg = isDark ? 'rgba(30,41,59,0.4)' : '#ffffff'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      alert('Thank you! I will get back to you shortly.')
      setForm({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
    }, 1200)
  }

  return (
    <div style={{ background: isDark ? colors.background.dark : colors.background.primary, color: textPrimary }}>
      
      <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto text-center overflow-hidden">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-500 mb-4 block">
            Get In Touch
          </span>

          <h1 className="text-5xl md:text-5xl font-black mb-8 tracking-tight leading-[1.1]" style={{ color: textPrimary }}>
            Let’s Build <span className="text-purple-500">Together.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-medium" style={{ color: textSecondary }}>
            Whether you have a specific project in mind or just want to explore 
            <strong className="text-purple-500 font-bold"> full-stack possibilities</strong>, 
            my inbox is always open for great ideas.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {contactMethods.map((method, i) => (
            <motion.div 
              key={i} 
              variants={staggerItem}
              className="p-8 rounded-[2rem] border transition-all duration-300 hover:border-purple-500/40 text-center md:text-left"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <method.icon className="text-purple-500" size={24} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-1 opacity-50">{method.title}</h4>
              <p className="text-xl font-bold mb-1" style={{ color: textPrimary }}>{method.detail}</p>
              <p className="text-sm" style={{ color: textSecondary }}>{method.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 px-6 border-t" style={{ borderColor }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-4xl font-black mb-8 leading-tight">My Working <br /> <span className="text-purple-500">Philosophy</span></h2>
            
            <div className="space-y-10">
              {[
                { icon: MessageSquare, title: 'Direct Communication', desc: 'No middle managers. You speak directly with the engineer building your product.' },
                { icon: ShieldCheck, title: 'Reliable Delivery', desc: 'I treat your project as if it were my own, ensuring high code quality and secure deployments.' },
                { icon: Clock, title: 'Gurugram Based', desc: 'Located in India’s tech hub, working seamlessly with global time zones.' }
              ].map((pill, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <pill.icon size={18} className="text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{pill.title}</h4>
                    <p className="text-sm leading-relaxed opacity-70" style={{ color: textSecondary }}>{pill.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex gap-4">
               {[Linkedin, Github, Twitter].map((Social, i) => (
                 <a key={i} href="#" className="p-4 rounded-2xl border transition-all hover:bg-purple-500/10" style={{ borderColor }}>
                   <Social size={20} className="text-purple-500" />
                 </a>
               ))}
            </div>
          </motion.div>

          <motion.div 
            className="p-10 md:p-12 rounded-[2.5rem] border shadow-2xl"
            style={{ backgroundColor: cardBg, borderColor }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1 opacity-60">Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    style={{ borderColor }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1 opacity-60">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    style={{ borderColor }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1 opacity-60">Subject</label>
                <input 
                  type="text" 
                  placeholder="Project Inquiry"
                  className="w-full px-5 py-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  style={{ borderColor }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1 opacity-60">Message</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Describe your vision..."
                  className="w-full px-5 py-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                  style={{ borderColor }}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-purple-500 text-white font-bold text-lg hover:bg-purple-600 transition-all shadow-xl shadow-purple-500/20 disabled:opacity-50"
              >
                {loading ? 'Sending Request...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for new projects
           </div>
           <h3 className="text-2xl font-bold mb-4">Based in Gurugram, India</h3>
           <p style={{ color: textSecondary }}>Collaborating with clients across San Francisco, London, and Dubai. <br /> (GMT +5:30)</p>
        </div>
      </section>

    </div>
  )
}