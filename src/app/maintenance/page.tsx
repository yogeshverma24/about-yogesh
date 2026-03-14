'use client'

import { motion } from "framer-motion"
import { Wrench, Mail } from "lucide-react"
import Link from "next/link"
import { Variants } from "framer-motion"

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center px-6 overflow-hidden relative">

      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl bg-purple-200 opacity-30"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl bg-purple-300 opacity-20"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-2xl text-center relative z-10"
      >

        <motion.div
          variants={fadeUp}
          className="flex justify-center mb-8"
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center shadow-lg"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Wrench className="w-10 h-10 text-purple-500" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
        >
          We'll Be Back Soon
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg text-slate-600 leading-relaxed mb-10"
        >
          Our website is currently undergoing scheduled maintenance to improve
          performance and bring you an even better experience.  
          Thank you for your patience.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >

          <Link
            href="/portfolio"
            className="px-6 py-3 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
          >
            Back to Home
          </Link>

          <Link
            href="mailto:support@example.com"
            className="px-6 py-3 rounded-full border border-purple-400 text-purple-500 font-semibold flex items-center gap-2 justify-center hover:bg-orange-50 transition"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </Link>

        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-12 text-sm text-slate-400"
        >
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </motion.p>

      </motion.div>
    </div>
  )
}