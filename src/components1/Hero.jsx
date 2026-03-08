'use client';

import React from 'react';
import assets from '../assets/assets';
import { motion } from "framer-motion";
import HeroImage from '../assets/hero_img.png';
import Image from 'next/image';
import { useTheme } from "next-themes";

import { colors, colorClasses } from '@/lib/constants/colors'

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      id="hero"
      className={`relative flex flex-col items-center gap-8 py-35 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden`}
      style={{
        background: isDark ? colors.gradient.dark : colors.gradient.soft,
        color: isDark ? colors.text.inverse : colors.text.primary
      }}
    >
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-400/20 blur-[140px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-lg shadow-sm"
        style={{
          border: `1px solid ${isDark ? colors.border.dark : colors.border.DEFAULT}`,
          background: isDark ? 'rgba(15,23,42,0.7)' : 'rgba(255,255,255,0.6)'
        }}
      >
        <Image className="w-20" src={assets.group_profile} alt="" />
        <p
          className="text-xs font-medium"
          style={{ color: isDark ? colors.neutral[400] : colors.text.secondary }}
        >
          Top Solution Provider Since 2018
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl xl:text-[78px] font-semibold xl:leading-[90px] max-w-5xl"
      >
        We Are{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: colors.gradient.primary }}
        >
          Data Inspired
        </span>
        , Tech Integrated,
        <br />
        Real Time Thinkers.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-sm sm:text-lg font-medium max-w-xl pb-4"
        style={{ color: isDark ? colors.neutral[400] : colors.text.secondary }}
      >
        We deliver innovative web design, development, and mobile application
        solutions that combine creativity with technology to drive measurable business growth.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex gap-4"
      >
        <button
          className={`px-8 py-3 rounded-full text-white font-medium shadow-lg transition hover:scale-105 ${colorClasses.primary.bg} ${colorClasses.primary.hover}`}
        >
          Explore Our Services
        </button>

        <button
          className="px-8 py-3 rounded-full font-medium transition hover:scale-105"
          style={{
            border: `1px solid ${colors.primary[500]}`,
            color: colors.primary[600],
            background: 'transparent'
          }}
        >
          View Our Works
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative mt-14"
      >
        <div
          className="absolute inset-0 blur-[120px] opacity-20 rounded-full scale-75 -z-10"
          style={{ background: colors.primary[500] }}
        />

        <Image
          src={HeroImage}
          alt="Catenally Digital Solutions"
          priority
          className="w-full max-w-6xl relative z-10 drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default Hero;