'use client'

import { motion, Variants } from 'framer-motion'
import {
  Code,
  MonitorSmartphone,
  Smartphone,
  Brush,
  Cloud,
  Wrench,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { colors } from '@/lib/constants/colors'

const easeOut = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
}

const services = [
  { icon: Code, title: 'We Plan', desc: 'We make the most of your resources and build your returns by identifying and developing business goals.' },
  { icon: MonitorSmartphone, title: 'We Design', desc: 'We ensure your online presence benefits your business and strengthens your brand.' },
  { icon: Smartphone, title: 'We Promote', desc: 'We ensure that you have all the ingredients to make the right noise in the market.' },
  { icon: Brush, title: 'We Analyze', desc: 'We provide the right insights and create strategies that pave the way to success.' },
  { icon: Cloud, title: 'We Support', desc: 'We offer a full range of digital support as a complete digital agency.' },
  { icon: Wrench, title: 'All Services', desc: 'Explore all our services to see how we can transform your business digitally.' },
]

export default function ServicesSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const background = isDark
    ? colors.gradient.dark
    : `linear-gradient(to bottom, ${colors.primary[50]}, ${colors.background.primary})`

  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const cardBackground = isDark ? 'rgba(15,23,42,0.4)' : '#ffffff'
  const cardBorder = isDark ? colors.neutral[800] : colors.border.light

  return (
    <section id="services" className="py-32 relative overflow-hidden" style={{ background }}>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 text-center relative">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ 
              backgroundColor: isDark ? colors.primary[900] + '40' : colors.primary[100], 
              color: colors.primary[500] 
            }}>
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6" style={{ color: textPrimary }}>
            Explore Our <span style={{ color: colors.primary[500] }}>Services</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: textSecondary }}>
            Premium software development services to build, scale, and transform your business digitally.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, i) => {
            const Icon = service.icon

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative p-10 rounded-[2rem] overflow-hidden transition-shadow duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]"
                style={{
                  background: cardBackground,
                  border: `1px solid ${cardBorder}`,
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="mb-8 relative">
                    <motion.div 
                      className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"
                    />
                    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg]"
                      style={{ background: isDark ? 'rgba(255,255,255,0.03)' : colors.primary[50] }}>
                      <Icon
                        className="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
                        style={{ color: colors.primary[500] }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ color: textPrimary }}>
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed font-medium" style={{ color: textSecondary }}>
                    {service.desc}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-purple-500/30 transition-colors duration-700 pointer-events-none" />
                
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"
                />
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-lg font-medium"
          style={{ color: textSecondary }}
        >
          Partner with us to build <span className="text-purple-500">innovative</span>, <span className="text-purple-500">scalable</span>, and future-ready digital products.
        </motion.div>

      </div>
    </section>
  )
}