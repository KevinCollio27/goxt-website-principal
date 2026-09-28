"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import AvatarGroupMaxDemo from "@/components/shadcn-studio/avatar/avatar-14";
import HeroVideo from "./hero-video";

export default function HeroSection() {
  return (
    <section>
      <div className="w-full h-full relative">
        <div className="relative w-full pt-10 md:pt-16 pb-8 md:pb-12 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col items-center gap-12 md:gap-16">

              {/* Contenido */}
              <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-6"
                >
                  <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
                    Plataforma logística + CRM para Latinoamérica
                  </Badge>

                  <h1 className="text-4xl font-medium tracking-tight text-balance md:text-6xl">
                    Vende, despacha y controla tu operación desde un solo lugar
                  </h1>

                  <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                    Deja de saltar entre planillas, WhatsApp y llamadas. Tu equipo
                    comercial y tu operación logística, trabajando sobre la misma
                    información.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
                  className="flex items-center flex-col md:flex-row justify-center gap-8 pt-2"
                >
                  <Button asChild className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer">
                    <a href="/plataformas">
                      <span className="relative z-10 transition-all duration-500">
                        Empieza gratis
                      </span>
                      <span className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                        <ArrowUpRight size={16} />
                      </span>
                    </a>
                  </Button>

                  <div className="flex items-center sm:gap-7 gap-3">
                    <AvatarGroupMaxDemo />
                    <div className="gap-1 flex flex-col items-start">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src="https://images.shadcnspace.com/assets/svgs/icon-star.svg"
                            alt="star"
                            className="h-4 w-4"
                          />
                        ))}
                      </div>
                      <p className="sm:text-sm text-xs font-normal text-muted-foreground text-left">
                        Copec, ERR, SLEP y más empresas confían en GOxT
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Demo del producto */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                className="w-full max-w-6xl"
              >
                <HeroVideo />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
