"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Github, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % t.hero.titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [t.hero.titles.length]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pb-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10",
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Avatar with glow effect */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-xl opacity-60"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <Image
              src="https://github.com/vjrivmon.png"
              alt="Vicente Rivas Monferrer"
              width={140}
              height={140}
              priority
              className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full border-4 border-background shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Name with gradient */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
            Vicente Rivas{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Monferrer
              </span>
              <Sparkles className="absolute -top-2 -right-8 h-6 w-6 text-accent animate-pulse" />
            </span>
          </h1>
        </motion.div>

        {/* Dynamic rotating titles */}
        <motion.div
          className="h-12 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.p
            key={titleIndex}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.hero.titles[titleIndex]}
          </motion.p>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {t.hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            {t.hero.viewProjects}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-accent transition-all"
          >
            {t.hero.aboutMe}
          </Link>
          <a
            href="/cv/Vicente_Rivas_CV.pdf"
            download
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all"
          >
            <Download className="mr-2 h-4 w-4" />
            {t.hero.downloadCV}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[
            { href: "https://github.com/vjrivmon", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/vicente-rivas-monferrer", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:vicenterivasmonferrer12@gmail.com", icon: Mail, label: "Email" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.label !== "Email" ? "_blank" : undefined}
              rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
              className="p-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-accent transition-all hover:scale-110"
              aria-label={social.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - Solo flecha animada */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </motion.div>
    </section>
  );
}