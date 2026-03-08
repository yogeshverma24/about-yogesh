'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { colors } from '@/lib/constants/colors'
import PatternBG from '../../../public/patternBG.png'
import ArrowOdd from '../../../public/arrowOdd.svg'
import ArrowEven from '../../../public/arrowEven.svg'

const easeOut = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
}

const steps = [
  { id: 1, title: 'Discover', text: 'We begin by understanding business objectives, target audience, and technical requirements to define the right project direction.' },
  { id: 2, title: 'Design', text: 'Our team designs intuitive user experiences and develop scalable web, mobile, and digital solutions tailored to project goals.' },
  { id: 3, title: 'Develop', text: 'Every solution undergoes performance testing and optimization to ensure consistency, reliability, and cross-platform excellence.' },
  { id: 4, title: 'Deliver', text: 'We successfully deploy projects with precision, ensuring high-quality execution and measurable business impact.' },
]

export default function HowItWorksSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <section
      className="relative py-32 overflow-hidden bg-cover bg-center transition-colors duration-500"
      style={{
        backgroundImage: isDark ? 'none' : `url(${PatternBG.src})`,
        backgroundColor: isDark ? colors.background.dark : colors.primary[600],
      }}
    >
      {!isDark && (
        <div className="absolute inset-0 opacity-90"
          style={{ background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[800]} 100%)` }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="uppercase tracking-[0.3em] text-xs font-bold mb-4"
            style={{ color: isDark ? colors.primary[400] : colors.primary[100] }}>
            WHAT'S THE FUNCTION
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight"
            style={{ color: isDark ? colors.text.inverse : '#ffffff' }}>
            Let’s see how it works
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-30"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((item, index) => (
            <motion.div
              key={item.id}
              variants={stepVariants}
              whileHover={{ y: -10 }}
              className="relative flex flex-col items-center text-center lg:items-start lg:text-left group"
            >
              {index !== steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute z-0 pointer-events-none"
                  style={{
                    top: '20px', 
                    left: '53%', 
                    width: '100%',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.2) + 0.5, duration: 1, ease: easeOut }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={index % 2 === 0 ? ArrowOdd : ArrowEven}
                    alt=""
                    className="w-[140px] xl:w-[180px] h-auto opacity-40 brightness-0 invert"
                  />
                </motion.div>
              )}

              <motion.div
                className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center font-black text-2xl mb-8 relative z-10 shadow-2xl transition-all duration-500 group-hover:rotate-[5deg]"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
                  color: isDark ? colors.primary[400] : colors.primary[600],
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  backdropFilter: isDark ? 'blur(10px)' : 'none',
                }}
              >
                {`0${item.id}`}
                {isDark && <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />}
              </motion.div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 tracking-tight"
                  style={{ color: isDark ? colors.text.inverse : '#ffffff' }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed text-sm font-medium opacity-90 max-w-[260px]"
                  style={{ color: isDark ? colors.text.muted : colors.primary[100] }}>
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}