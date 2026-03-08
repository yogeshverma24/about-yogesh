'use client'

import { motion, Variants } from 'framer-motion'
import { useTheme } from 'next-themes'
import { colors } from '@/lib/constants/colors'

const easeOut = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
}

const articles = [
  {
    category: 'Artificial Intelligence',
    title: 'How AI Is Transforming Modern Software Development',
    desc: 'From intelligent automation to predictive systems, AI is reshaping how scalable and intelligent software is built today.',
    image: '/images/home1/ai1.png',
    read: '5 min read',
    link: '/blog/ai-software-development',
  },
  {
    category: 'Cloud & DevOps',
    title: 'Building Scalable Products with Cloud-Native Architecture',
    desc: 'Learn how cloud-native systems improve reliability, performance, deployment speed, and long-term scalability.',
    image: '/images/home1/cloud.png',
    read: '6 min read',
    link: '/blog/cloud-native-architecture',
  },
  {
    category: 'UI / UX Design',
    title: 'Why User-Centric Design Drives Business Growth',
    desc: 'A deep dive into how thoughtful design improves engagement, conversion rates, and long-term brand trust.',
    image: '/images/home1/uiux.png',
    read: '4 min read',
    link: '/blog/user-centric-design',
  },
]

export default function InsightsSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const sectionBackground = isDark
    ? colors.gradient.dark
    : `linear-gradient(135deg, ${colors.primary[50]}, ${colors.background.primary})`

  const textPrimary = isDark ? colors.text.inverse : colors.text.primary
  const textSecondary = isDark ? colors.neutral[400] : colors.text.secondary
  const cardBackground = isDark ? "rgba(15,23,42,0.4)" : "#ffffff"
  const cardBorder = isDark ? colors.neutral[800] : colors.border.light

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: sectionBackground }}>
      
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] bg-purple-500/10 -z-10" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[120px] bg-indigo-500/10 -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ 
              backgroundColor: isDark ? colors.primary[900] + '40' : colors.primary[100], 
              color: colors.primary[500] 
            }}>
            Insights & Thinking
          </span>

          <h2 className="text-4xl md:text-4xl font-extrabold tracking-tight" style={{ color: textPrimary }}>
            Technology, Ideas & <span style={{ color: colors.primary[500] }}>Innovation</span>
          </h2>

          <p className="mt-6 text-lg" style={{ color: textSecondary }}>
            Our perspective on emerging technologies, digital strategy, and real-world software engineering experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {articles.map((article, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
              style={{
                background: cardBackground,
                border: `1px solid ${cardBorder}`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="h-60 overflow-hidden relative">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: easeOut }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[1px]" style={{ backgroundColor: colors.primary[500] }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.primary[500] }}>
                    {article.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-tight group-hover:text-primary-500 transition-colors duration-300"
                  style={{ color: textPrimary }}>
                  {article.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed line-clamp-3" style={{ color: textSecondary }}>
                  {article.desc}
                </p>

                <div className="mt-8 pt-6 border-t flex items-center justify-between"
                  style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  
                  <span className="text-xs font-medium" style={{ color: textSecondary }}>
                    {article.read}
                  </span>

                  <motion.a
                    href={article.link}
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{ color: colors.primary[500] }}
                    whileHover={{ x: 5 }}
                  >
                    Read More 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}