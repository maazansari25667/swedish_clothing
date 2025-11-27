"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { HighlightCard } from "@/components/ui/nc-card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

const Hero = () => {
  const { t } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Autoplay video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to autoplay (muted for browser policies)
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // Autoplay blocked by browser - video stays paused
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    }
  }, []);

  // Sync mute state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-background min-h-screen flex items-center"
    >
      <div className="container relative z-10 py-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center min-h-[85vh]">
          {/* Text Content - Left Side (appears second on mobile) */}
          <motion.div
            style={{ y: textY }}
            className="flex items-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-lg">
              {/* PREMIUM GLASS-MORPHISM CARD */}
              <div className="relative backdrop-blur-3xl bg-white/40 dark:bg-background/30 border border-white/30 rounded-[2rem] p-8 md:p-10 lg:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.12)] hover:shadow-[0_32px_120px_rgba(0,0,0,0.16)] transition-all duration-500">
                {/* Multi-layer gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-orange-500/8 to-transparent rounded-[2rem]" />
                <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-white/10 rounded-[2rem]" />

                <div className="relative space-y-8">
                  {/* Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="inline-block px-5 py-2.5 text-sm font-semibold tracking-ultra-wide text-primary bg-white/60 rounded-full border border-primary/30 backdrop-blur-xl shadow-[0_4px_16px_rgba(251,146,60,0.15)] uppercase">
                      {t.hero.subtitle}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-display-xl font-bold tracking-tighter leading-[1.05] max-w-xl bg-gradient-to-r from-foreground via-primary to-orange-600 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(251,146,60,0.4)]"
                  >
                    {t.hero.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl lg:text-2xl font-sans font-light text-muted-foreground leading-relaxed max-w-lg tracking-wide"
                  >
                    {t.hero.description}
                  </motion.p>

                  {/* CTA Buttons - CTA Design System */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    {/* Primary Hero CTA: View Menu - Secondary variant */}
                    <Button
                      variant="secondary"
                      size="lg"
                      asChild
                    >
                      <motion.a
                        href="/menu"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{t.hero.viewMenu}</span>
                        <Icons.arrowRight className="ml-2 h-4 w-4" />
                      </motion.a>
                    </Button>

                    {/* Secondary Hero CTA: Book Table - Ghost variant */}
                    <Button
                      variant="ghost"
                      size="lg"
                      asChild
                    >
                      <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icons.calendar className="mr-2 h-4 w-4" />
                        <span>{t.hero.bookTable}</span>
                      </motion.a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Content - Right Side (appears first on mobile) */}
          <motion.div
            style={{ y: videoY }}
            className="flex items-center order-1 lg:order-2"
          >
            <div className="relative w-full">
              <HighlightCard
                className="relative group overflow-hidden ring-2 ring-white/20 backdrop-blur-sm border-white/30"
              >
                {/* Video - Autoplays on mount */}
                <motion.video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster="/images/Gallery/10-768x512.jpg"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "565/775" }}
                  animate={{
                    scale: isPlaying ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <source src="/images/Gallery/video_4.mp4" type="video/mp4" />
                </motion.video>

                {/* Cinematic gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-orange-500/20 pointer-events-none mix-blend-overlay" />

                {/* Mute/Unmute toggle button */}
                <motion.button
                  onClick={toggleMute}
                  className="absolute top-6 right-6 z-20 flex items-center justify-center w-14 h-14 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-xl border-2 border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        clipRule="evenodd"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  )}
                </motion.button>

                {/* Autoplay info text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
                >
                  <p className="text-base text-white font-bold px-8 py-3 rounded-full bg-black/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    {t.hero.autoplayPreview}
                  </p>
                </motion.div>

                {/* Animated border glow - subtle pulse */}
                <motion.div
                  className="absolute inset-0 rounded-[2rem] pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 40px rgba(239, 68, 68, 0.3)",
                      "0 0 60px rgba(239, 68, 68, 0.5)",
                      "0 0 40px rgba(239, 68, 68, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </HighlightCard>

              {/* Floating gradient orbs - larger and more prominent */}
              <motion.div
                className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/30 to-orange-500/30 rounded-full blur-3xl pointer-events-none"
                animate={{
                  y: [0, 40, 0],
                  rotate: [0, 120, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl pointer-events-none"
                animate={{
                  y: [0, -40, 0],
                  rotate: [0, -120, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-20"
        >
          <p className="text-sm text-foreground font-semibold tracking-wide uppercase drop-shadow-lg">
            {t.hero.scrollToExplore}
          </p>
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-6 h-6 text-primary drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl opacity-50" />
      </div>
    </section>
  );
};

export default Hero;
