"use client";

import { useState, useEffect } from "react";
import { Instrument_Serif } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import AvatarGroupMaxDemo from "@/components/shadcn-studio/avatar/avatar-14";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const WORDS = [
  { text: "WhatsApp",     from: "#25D366", to: "#128C7E" },
  { text: "Excel",        from: "#217346", to: "#0E5C30" },
  { text: "correos",      from: "#3B82F6", to: "#1D4ED8" },
  { text: "papel",        from: "#F59E0B", to: "#D97706" },
  { text: "notas de voz", from: "#F97316", to: "#EA580C" },
];

const INTERVAL = 2500;

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const current = WORDS[index];

  return (
    <section>
      <div className="w-full h-full relative">
        <div className="relative w-full pt-0 md:pt-10 pb-4 md:pb-6 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col max-w-5xl mx-auto gap-5">
              <div className="relative flex flex-col text-center items-center sm:gap-4 gap-3">
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="lg:text-8xl md:text-7xl text-5xl font-medium leading-14 md:leading-20 lg:leading-24 tracking-tight"
                >
                  ¿Sigues gestionando{" "}
                  <br />
                  <span className={instrumentSerif.className}>
                    tu negocio en{" "}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        style={{
                          background: `linear-gradient(135deg, ${current.from} 0%, ${current.to} 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          display: "inline-block",
                        }}
                      >
                        {current.text}
                      </motion.span>
                    </AnimatePresence>
                    {"?"}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
                  className="text-base font-normal max-w-2xl text-foreground/60"
                >
                  Gestiona clientes, cotizaciones y flota desde un solo lugar.
                  Menos caos, más control. Implementación en días, no meses.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                className="flex items-center flex-col md:flex-row justify-center gap-8"
              >
                <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer">
                  <span className="relative z-10 transition-all duration-500">
                    Empieza gratis
                  </span>
                  <span className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </Button>

                <div className="flex items-center sm:gap-7 gap-3">
                  <AvatarGroupMaxDemo />
                  <div className="gap-1 flex flex-col items-start">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <img
                          key={i}
                          src="https://images.shadcnspace.com/assets/svgs/icon-star.svg"
                          alt="star"
                          className="h-4 w-4"
                        />
                      ))}
                    </div>
                    <p className="sm:text-sm text-xs font-normal text-muted-foreground">
                      Copec, ERR, SLEP y más empresas confían en GOxT
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
