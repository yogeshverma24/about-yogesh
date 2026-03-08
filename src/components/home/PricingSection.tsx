'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { IoIosCheckmarkCircle } from "react-icons/io"
import { useTheme } from "next-themes"
import { colors } from '@/lib/constants/colors'

const easeOut = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: easeOut } 
  }
}

export default function PricingSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [active, setActive] = useState<'monthly' | 'annual'>('monthly')

  const sectionBackground = isDark ? colors.gradient.dark : "linear-gradient(to bottom, #faf5ff, #ffffff)"
  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const cardBackground = isDark ? "rgba(15,23,42,0.4)" : "#ffffff"
  const cardBorder = isDark ? colors.neutral[800] : colors.border.light
  const toggleBackground = isDark ? "rgba(15,23,42,0.7)" : "#ffffff"

  const plans = {
    monthly: [
      { name: 'Starter', price: 19, description: 'Perfect for startups & small teams', features: ['Up to 5 Projects', 'Basic Analytics', 'Email Support', 'Community Access'] },
      { name: 'Pro', price: 49, description: 'Best for growing businesses', featured: true, features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Team Collaboration'] },
      { name: 'Enterprise', price: 99, description: 'Custom solutions for enterprises', features: ['Dedicated Manager', 'Custom Integrations', '24/7 Premium Support', 'Enterprise Security'] },
    ],
    annual: [
      { name: 'Starter', price: 190, description: 'Perfect for startups & small teams', features: ['Up to 5 Projects', 'Basic Analytics', 'Email Support', 'Community Access'] },
      { name: 'Pro', price: 490, description: 'Best for growing businesses', featured: true, features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Team Collaboration'] },
      { name: 'Enterprise', price: 990, description: 'Custom solutions for enterprises', features: ['Dedicated Manager', 'Custom Integrations', '24/7 Premium Support', 'Enterprise Security'] },
    ],
  }

  const currentPlans = plans[active]

  return (
    <section className="py-32 overflow-hidden relative" style={{ background: sectionBackground }}>
      
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-400/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: isDark ? colors.primary[900] + '40' : colors.primary[100], color: colors.primary[500] }}>
            Pricing Plan
          </span>
          <h2 className="text-4xl md:text-4xl font-extrabold" style={{ color: textPrimary }}>
            Choose Your <span style={{ color: colors.primary[500] }}>Perfect Plan</span>
          </h2>
        </motion.div>

        <div className="flex justify-center mb-20">
          <div className="relative flex border rounded-full p-1.5 shadow-sm"
            style={{ background: toggleBackground, borderColor: isDark ? colors.neutral[800] : colors.primary[100] }}>
            
            <motion.div
              layoutId="pricing-pill"
              className="absolute inset-y-1.5 rounded-full z-0"
              style={{
                left: active === 'monthly' ? 6 : '50%',
                width: 'calc(50% - 6px)',
                background: colors.gradient.primary
              }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />

            {['monthly', 'annual'].map((type) => (
              <button
                key={type}
                onClick={() => setActive(type as any)}
                className="relative z-10 px-10 py-3 rounded-full text-sm font-bold transition-colors duration-300"
                style={{ color: active === type ? "#ffffff" : textSecondary }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentPlans.map((plan) => (
            <motion.div
              key={plan.name}
              layout 
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3, ease: easeOut } }}
              className="relative rounded-3xl p-10 flex flex-col border backdrop-blur-md"
              style={{
                background: cardBackground,
                borderColor: plan.featured ? colors.primary[500] : cardBorder,
                boxShadow: plan.featured ? `0 20px 40px -12px ${colors.primary[500]}25` : 'none'
              }}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg"
                  style={{ background: colors.gradient.primary }}>
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>{plan.name}</h3>
              <p className="text-sm mb-8" style={{ color: textSecondary }}>{plan.description}</p>

              <div className="h-20 mb-6 flex items-baseline">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active + plan.price}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex items-baseline"
                  >
                    <span className="text-5xl font-black" style={{ color: textPrimary }}>
                      ${plan.price}
                    </span>
                    <span className="text-base font-medium ml-1" style={{ color: textSecondary }}>
                      {active === 'monthly' ? ' /mo' : ' /yr'}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: textSecondary }}>
                    <IoIosCheckmarkCircle className="text-xl shrink-0" style={{ color: colors.primary[500] }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg"
                style={{
                  background: plan.featured
                    ? colors.gradient.primary
                    : colors.primary[100],
                  color: plan.featured
                    ? "#ffffff"
                    : colors.primary[600]
                }}
                
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
