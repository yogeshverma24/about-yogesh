'use client';

import Image from "next/image";
import { ArrowRight, Award, Layers, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { colors, colorClasses } from "@/lib/constants/colors";

const words = ["Data Inspired", "Tech Integrated", "Real Time Thinkers"];

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = deleting ? 40 : 80;
    const fullText = words[currentWord];

    const timer = setTimeout(() => {
      setText((prev) =>
        deleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );

      if (!deleting && text === fullText) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && text === "") {
        setDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, currentWord]);

  return (
    <section className="relative w-full overflow-hidden py-28 lg:py-40">

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.primary[50]}, ${colors.background.primary})`,
        }}
      />

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20">

        <div className="grid lg:grid-cols-2 items-center gap-20">

          <div className="space-y-10">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-lg border border-purple-200 bg-white/60 shadow-sm"
            >
              🚀 Software & Digital Solutions
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-5xl sm:text-6xl font-extrabold leading-[1.1]"
                style={{ color: colors.text.primary }}
              >
                We Are
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl font-extrabold min-h-[70px]"
                style={{ color: colors.primary[600] }}
              >
                {text}
                <span className="animate-pulse">|</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: colors.text.secondary }}
            >
              Catenally delivers high-performance web, mobile, and enterprise
              software solutions powered by intelligence, innovation, and
              real-time execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 pt-4"
            >
              <Button
                size="lg"
                className={`px-10 py-4 rounded-xl shadow-lg transition ${colorClasses.primary.bg} ${colorClasses.primary.hover}`}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-10 py-4 rounded-xl border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                Explore Services
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10">

              <HeroMiniCard icon={Award} title="Top" subtitle="Solution Provider" />
              <HeroMiniCard icon={Layers} title="Multi" subtitle="Platform Expertise" />
              <HeroMiniCard icon={Zap} title="Real-Time" subtitle="Technology Thinkers" />

            </div>

          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 bg-purple-500 rounded-[3rem] blur-[120px] opacity-20 scale-90" />
              <Image
                src="/images/hero.png"
                alt="Catenally Digital Solutions"
                width={650}
                height={650}
                priority
                className="relative drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function HeroMiniCard({ icon: Icon, title, subtitle }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex items-start gap-4 p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-100 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="p-3 rounded-xl bg-purple-100">
        <Icon className="h-6 w-6 text-purple-600" />
      </div>
      <div>
        <div className="text-lg font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
    </motion.div>
  );
}