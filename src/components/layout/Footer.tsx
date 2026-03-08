'use client';

import React from 'react';
import Link from 'next/link';
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const footerLinks = {
  company: [
    { label: 'Who We Are', href: '/about' },
    { label: 'What We Do', href: '/services' },
    { label: 'Our Works', href: '/portfolio' },
    { label: 'Where We Locate', href: '/contact' },
  ],
  services: [
    { label: 'Web Development', href: '/services' },
    { label: 'iOS & Android Apps', href: '/services' },
    { label: 'UI/UX Strategy', href: '/services' },
    { label: 'Digital Consulting', href: '/services' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'GST Info', href: '/gst' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com' },
  { icon: Twitter, href: 'https://twitter.com' },
  { icon: Instagram, href: 'https://instagram.com' },
  { icon: Github, href: 'https://github.com' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0f172a] text-gray-400 pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="text-3xl font-black tracking-tighter text-white group-hover:text-purple-400 transition-colors">
                Portfolio
              </span>
            </Link>
            
            <p className="text-lg font-medium leading-relaxed opacity-80">
              Architecting innovative digital solutions through elite engineering and creative strategy.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <MapPin size={20} className="text-purple-500 mt-1 shrink-0" />
                <span className="text-sm group-hover:text-white transition-colors">Anugiri Apartments, 6th Floor, Nagol, Hyderabad – 500003</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <Phone size={20} className="text-purple-500 shrink-0" />
                <span className="text-sm group-hover:text-white transition-colors">+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <Mail size={20} className="text-purple-500 shrink-0" />
                <span className="text-sm group-hover:text-white transition-colors">contact@catenally.com</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm font-semibold hover:text-purple-400 transition-colors flex items-center gap-1 group">
                      {link.label}
                      <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm font-semibold hover:text-purple-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all active:scale-95"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest opacity-40">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">
              © 2026 Catenally • Engineering Tomorrow
            </p>
            <p className="text-[10px] mt-1 font-medium opacity-30">
              Maintained by <span className="text-white">DelegateSpaces</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}