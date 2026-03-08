'use client'

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { colors } from "@/lib/constants/colors";
import { useTheme } from "next-themes";
import { motion, Variants } from "framer-motion";

import Member1 from "../../../public/images/team/member-1.png";
import Member2 from "../../../public/images/team/member-2.png";
import Member3 from "../../../public/images/team/member-3.png";
import Member4 from "../../../public/images/team/member-4.png";
import Member5 from "../../../public/images/team/member-5.png";
import Member6 from "../../../public/images/team/member-6.png";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const teamData = [
  { id: 1, image: Member1, name: "Mauricette Mayme", role: "CEO and Founder" },
  { id: 2, image: Member2, name: "Madyson Elmo", role: "Founder" },
  { id: 3, image: Member3, name: "Madyson Elmo", role: "Web Designer" },
  { id: 4, image: Member4, name: "Sharalyn Charmaine", role: "Web Developer" },
  { id: 5, image: Member5, name: "Mauricette Mayme", role: "CEO and Founder" },
  { id: 6, image: Member6, name: "Madyson Elmo", role: "Web Designer" },
];

export default function TeamSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section
      className="py-28 overflow-hidden"
      style={{
        background: isDark ? colors.background.dark : colors.background.primary,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              backgroundColor: isDark ? colors.primary[900] : colors.primary[100],
              color: isDark ? colors.primary[300] : colors.primary[500],
            }}
          >
            Our Team
          </span>

          <h2
            className="text-4xl md:text-4xl font-extrabold"
            style={{ color: isDark ? colors.text.inverse : colors.text.primary }}
          >
            The most qualified and
            <span style={{ color: colors.primary[500] }}> talented individuals</span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {teamData.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col items-center text-center transition-all duration-300 rounded-xl py-6"
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full border-2 object-cover shadow-md"
                  style={{ borderColor: colors.primary[500] }}
                />
              </div>

              <h3
                className="text-xl font-semibold transition-colors duration-300"
                style={{ color: isDark ? colors.text.inverse : colors.text.primary }}
              >
                {member.name}
              </h3>

              <p
                className="mt-2 transition-colors duration-300"
                style={{ color: isDark ? colors.neutral[400] : colors.text.secondary }}
              >
                {member.role}
              </p>

              <div className="absolute right-6 bottom-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                <a href="#" className="hover:scale-110 transition-transform" style={{ color: colors.primary[500] }}>
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:scale-110 transition-transform" style={{ color: colors.primary[500] }}>
                  <FaTwitter />
                </a>
                <a href="#" className="hover:scale-110 transition-transform" style={{ color: colors.primary[500] }}>
                  <FaInstagram />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}