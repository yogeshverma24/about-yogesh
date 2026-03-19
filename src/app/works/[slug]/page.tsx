'use client'

import { useParams, useRouter } from 'next/navigation'
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
  Smartphone,
  ArrowLeft,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

const iconMap: any = {
  Globe: <Globe size={18} />,
  Code2: <Code2 size={18} />,
  Palette: <Palette size={18} />,
  Zap: <Zap size={18} />,
  Server: <Server size={18} />,
  Smartphone: <Smartphone size={18} />
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const BorderCard = ({ title, icon: Icon, children, borderColor, textPrimary, cardBg }: any) => (
  <div className="relative mt-14 mb-6 p-8 rounded-[2rem] border" style={{ borderColor }}>
    <div
      className="absolute -top-4 left-8 px-5 py-1.5 flex items-center gap-2.5 rounded-full border shadow-md"
      style={{
        borderColor,
        background: cardBg,
        color: textPrimary,
      }}
    >
      <Icon size={18} className="text-purple-500" />
      <span className="text-xs font-black uppercase tracking-[0.2em]">{title}</span>
    </div>
    {children}
  </div>
)

export default function ProjectDetails() {
  const { slug } = useParams()
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'
  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const borderColor = isDark ? colors.neutral[700] : colors.neutral[200]
  const cardBg = isDark ? colors.neutral[800] : colors.background.primary
  const project = projects.find(p => p.slug === slug)

  if (!project) return <div className="pt-40 text-center">Project Not Found</div>

  return (
    <div style={{ background: isDark ? colors.background.dark : colors.background.primary, color: textPrimary }}>

      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-3 text-sm font-semibold hover:text-purple-500 transition-colors"
            >
              <div className="p-2.5 rounded-full border group-hover:border-purple-500 transition-colors" style={{ borderColor }}>
                <ArrowLeft size={18} />
              </div>
              Back to Projects
            </button>

            <Link
              href={project.link}
              target="_blank"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition shadow-lg shadow-purple-500/20"
            >
              Visit Live Website <ExternalLink size={16} />
            </Link>
          </div>

          <h1 className="text-6xl md:text-6xl font-black mb-8 tracking-tighter">
            {project.title}
          </h1>

          <p className="text-xl md:text-1xl max-w-4xl leading-relaxed opacity-80" style={{ color: textSecondary }}>
            {project.description}
          </p>
        </motion.div>

        <div className="mt-16 rounded-[2.5rem] overflow-hidden border shadow-2xl" style={{ borderColor }}>
          <Image
            src={project.hero}
            alt={project.title}
            width={1400}
            height={800}
            priority
            className="w-full h-auto hover:scale-[1.01] transition duration-700"
          />
        </div>
      </section>

      <section className="pb-10 max-w-7xl mx-auto px-6">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-7xl mx-auto space-y-4">
            <BorderCard title="The Mission" icon={Layers} borderColor={borderColor} textPrimary={textPrimary} cardBg={cardBg}>
              <div className="relative">
                <p className="leading-relaxed text-[16px] font-medium opacity-90" style={{ color: textSecondary }}>
                  {project.overview}
                </p>
              </div>
            </BorderCard>

            <div className="grid md:grid-cols-2 gap-8">
              <BorderCard title="The Challenge" icon={Target} borderColor={borderColor} textPrimary={textPrimary} cardBg={cardBg}>
                <div className="space-y-4">
                  {project.problem.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                    <div key={i} className="flex gap-3 group">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0 group-hover:scale-150 transition-transform" />
                      <p className="text-base leading-relaxed opacity-80" style={{ color: textSecondary }}>
                        {line.replace('•', '').trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </BorderCard>

              <BorderCard title="The Execution" icon={Lightbulb} borderColor={borderColor} textPrimary={textPrimary} cardBg={cardBg}>
                <div className="space-y-4">
                  {project.solution.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                    <div key={i} className="flex gap-3 items-start group">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5 group-hover:rotate-12 transition-transform" />
                      <p className="text-base leading-relaxed font-medium" style={{ color: textSecondary }}>
                        {line.replace('•', '').trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </BorderCard>
            </div>
          </div>

          <div className="mt-25 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1" style={{ background: borderColor }}></div>
              <div className="flex items-center gap-2 uppercase tracking-[0.2em] text-[12px] font-bold opacity-50">
                <Code2 size={14} /> Technology Stack
              </div>
              <div className="h-px flex-1" style={{ background: borderColor }}></div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 py-2">
              {project.techStack.map((tech: any) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-sm font-medium hover:border-purple-500 transition-all bg-transparent"
                  style={{ borderColor }}
                >
                  <span className="text-purple-500">{iconMap[tech.icon]}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.impact?.map((item: any, index: number) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-[2rem] flex flex-col gap-5 transition-all"
                  style={{
                    background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.03)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-purple-500 font-bold">
                      {item.label}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-1xl font-black tracking-tight leading-none">
                      {item.value}
                    </h4>
                    <p className="text-sm opacity-60 leading-relaxed pt-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="h-[1px] w-8 bg-purple-500/20" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {project.gallery && (
            <div className="mt-32">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 rounded-xl bg-purple-500/10">
                  <Images className="text-purple-500" size={20} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Project Visuals</h2>
              </div>

              <div className={`grid gap-6 ${project.deviceType === 'mobile'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                {project.gallery.map((img, index) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-900 ${project.deviceType === 'mobile' ? 'aspect-[9/16]' : 'aspect-[16/10]'
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />

                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-[2rem]" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {project.demoVideo && (
            <section className="py-24 max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-12">
                <Video className="text-purple-500" />
                <h2 className="text-2xl font-bold">Demo Video</h2>
              </div>

              <div className="flex justify-center">
                <div
                  className="w-[320px] md:w-[380px] rounded-3xl overflow-hidden border"
                  style={{ borderColor }}
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

          {project.adminPanel && (
            <div className="my-15">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10">
                  <Server className="text-purple-500" size={20} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Admin Control Center</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-5">
                  <div className="py-2">
                    <p className="text-lg opacity-70 leading-relaxed" style={{ color: textSecondary }}>
                      {project.adminPanel.description}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.adminPanel.capabilities.map((cap: any, index: number) => (
                      <div
                        key={index}
                        className="p-5 rounded-2xl border transition-all"
                        style={{
                          borderColor,
                          background: isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.02)'
                        }}
                      >
                        <span className="text-[10px] uppercase tracking-widest text-purple-500 font-black block mb-2">
                          {cap.label}
                        </span>
                        <p className="text-xs font-medium leading-relaxed opacity-80">
                          {cap.feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                  <div
                    className="relative rounded-[2rem] overflow-hidden border aspect-[16/10] shadow-2xl"
                    style={{ borderColor }}
                  >
                    <Image
                      src={project.adminPanel.image}
                      alt="Admin Dashboard"
                      fill
                      className="object-cover object-top hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 pb-30 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-600/[0.03] -z-10"></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h3 className="text-5xl md:text-5xl font-black mb-8 tracking-tighter">
            Ready to explore?
          </h3>
          <p className="mb-12 max-w-2xl mx-auto text-xl opacity-60 px-6">
            Experience the full build of {project.title} and see the technical architecture in a live environment.
          </p>
          <Link
            href={project.link}
            target="_blank"
            className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-purple-600 text-white font-bold  hover:bg-purple-700 transition-all hover:shadow-[0_20px_50px_rgba(147,51,234,0.3)]"
          >
            Launch Live Website
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}