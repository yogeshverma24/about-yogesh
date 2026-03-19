'use client'

import { useParams } from 'next/navigation'
import { projects } from '@/lib/data/projects'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { colors } from '@/lib/constants/colors'
import { motion } from 'framer-motion'
import Link from 'next/link'

import {
  Layers,
  Code2,
  Lightbulb,
  Target,
  CheckCircle2,
  Rocket,
  Video,
  Images,
  Globe,
  Server,
  Palette,
  Zap,
  Smartphone
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
}

export default function ProjectDetails() {

  const { slug } = useParams()
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const borderColor = isDark ? colors.neutral[700] : colors.border.DEFAULT
  const cardBg = isDark ? colors.neutral[800] : colors.background.primary

  const project = projects.find(p => p.slug === slug)

  if (!project) return <div className="pt-40 text-center">Project Not Found</div>

  const techIcons: any = {
    "Next.js": <Globe className="text-purple-500" />,
    "TypeScript": <Code2 className="text-purple-500" />,
    "TailwindCSS": <Palette className="text-purple-500" />,
    "Framer Motion": <Zap className="text-purple-500" />,
    "Vercel": <Server className="text-purple-500" />,
    "Responsive Design": <Smartphone className="text-purple-500" />
  }

  return (

    <div
      style={{
        background: isDark ? colors.background.dark : colors.background.primary,
        color: textPrimary
      }}
    >

      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">

        <motion.div initial="hidden" animate="visible" variants={fadeUp}>

          <h1 className="text-5xl md:text-6xl font-black mb-6">
            {project.title}
          </h1>

          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: textSecondary }}>
            {project.description}
          </p>

        </motion.div>

        <div className="mt-14 rounded-3xl overflow-hidden border" style={{borderColor}}>

          <Image
            src={project.hero}
            alt={project.title}
            width={1400}
            height={800}
            priority
            className="rounded-3xl hover:scale-[1.02] transition"
          />
        </div>
      </section>

      <section className="py-24 max-w-6xl mx-auto px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >

          <div className="flex items-center gap-3 mb-8">
            <Layers className="text-purple-500" />
            <h2 className="text-3xl font-bold">Project Overview</h2>
          </div>

          <p className="leading-relaxed text-lg whitespace-pre-line" style={{ color: textSecondary }}>
            {project.overview}
          </p>
        </motion.div>
      </section>


      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14">

        <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>

          <div className="flex items-center gap-3 mb-6">
            <Target className="text-purple-500" />
            <h3 className="text-2xl font-bold">Problem</h3>
          </div>

          <p className="whitespace-pre-line" style={{ color: textSecondary }}>
            {project.problem}
          </p>

        </motion.div>

        <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>

          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-purple-500" />
            <h3 className="text-2xl font-bold">Solution</h3>
          </div>

          <p className="whitespace-pre-line" style={{ color: textSecondary }}>
            {project.solution}
          </p>
        </motion.div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-3 mb-12">
          <Code2 className="text-purple-500" />
          <h2 className="text-3xl font-bold">Tech Stack</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm hover:shadow-sm transition"
              style={{ borderColor, background: cardBg }}
            >
              {techIcons[tech]}
              {tech}
            </div>
          ))}
        </div>
      </section>


      <section className="py-24 max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-3 mb-12">
          <Rocket className="text-purple-500" />
          <h2 className="text-3xl font-bold">Key Features</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {project.features.map((f) => (
            <div key={f} className="flex gap-3">
              <CheckCircle2 className="text-purple-500 mt-1" size={18} />
              <p style={{ color: textSecondary }}>{f}</p>
            </div>
          ))}
        </div>
      </section>

      {project.useCases && (

        <section className="py-24 max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-3 mb-12">
            <Target className="text-purple-500" />
            <h2 className="text-3xl font-bold">Use Cases</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {project.useCases.map(use => (
              <div
                key={use}
                className="p-6 rounded-2xl border"
                style={{borderColor,background:cardBg}}
              >

                <p style={{color:textSecondary}}>
                  {use}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}


      {project.gallery && (

        <section className="py-24 max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-3 mb-12">
            <Images className="text-purple-500" />
            <h2 className="text-3xl font-bold">Project Screens</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {project.gallery.map((img) => (
              <Image
                key={img}
                src={img}
                width={600}
                height={400}
                alt="project"
                className="rounded-2xl transition hover:scale-105"
              />

            ))}
          </div>
        </section>
      )}

      {project.demoVideo && (

        <section className="py-24 max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <Video className="text-purple-500" />
            <h2 className="text-3xl font-bold">Demo Video</h2>
          </div>

          <div className="flex justify-center">
            <div
              className="w-[320px] md:w-[380px] rounded-3xl overflow-hidden border"
              style={{borderColor}}
            >
              <video
                controls
                playsInline
                className="w-full h-auto"
              >
                <source src={project.demoVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-3 mb-12">
          <Rocket className="text-purple-500" />
          <h2 className="text-3xl font-bold">Project Results</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {project.results.map(result => (

            <div
              key={result}
              className="flex items-start gap-3 p-6 rounded-2xl border"
              style={{borderColor,background:cardBg}}
            >

              <CheckCircle2 className="text-green-500 mt-1" />

              <p style={{color:textSecondary}}>
                {result}
              </p>
            </div>
          ))}
        </div>
      </section>


      <section className="py-24 text-center">

        <h3 className="text-3xl font-bold mb-6">
          Explore the Live Project
        </h3>

        <p className="mb-8 max-w-xl mx-auto" style={{color:textSecondary}}>
          Experience the full project and explore the features, design, and performance optimizations implemented in the live environment.
        </p>

        <Link
          href={project.link}
          target="_blank"
          className="px-10 py-4 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
        >
          Visit Live Website
        </Link>
      </section>
    </div>
  )
}