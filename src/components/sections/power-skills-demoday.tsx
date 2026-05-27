"use client";

import { useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { motion, useInView } from "motion/react";

const bullets = [
  "Feedback de expertos reales",
  "Conexión con empresas e inversores",
  "Oportunidades reales de crecimiento",
  "Proyectos que generan impacto",
];

export default function PowerSkillsDemoDay() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef}>
      <div className="max-w-7xl mx-auto sm:px-16 px-4 pt-12 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          className="flex flex-col gap-3"
        >
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Demo Day
          </Badge>
          <h2 className="sm:text-5xl text-xl leading-none font-medium">
            El momento de la verdad.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          className="pt-12 pb-8"
        >
          <div className="grid grid-cols-12 gap-6 items-center">

            {/* Columna izquierda: comilla + quote + autor + bullets */}
            <div className="lg:col-span-8 col-span-12 flex sm:flex-row flex-col sm:gap-10 gap-6 lg:pe-12">
              <div className="shrink-0 flex items-start">
                <img
                  src="https://images.shadcnspace.com/assets/svgs/icon-quote.svg"
                  alt="quote"
                  className="dark:hidden"
                />
                <img
                  src="https://images.shadcnspace.com/assets/svgs/icon-quote-white.svg"
                  alt="quote"
                  className="hidden dark:block"
                />
              </div>
              <div className="flex flex-col gap-10">
                <p className="sm:text-4xl text-xl text-muted-foreground">
                  "Los participantes no presentan ante un profesor. Presentan ante empresas, inversores y el ecosistema que puede hacer crecer su proyecto."
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-2">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="size-4 text-primary shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-medium">GOxT + NODO</p>
                    <p className="text-sm text-muted-foreground">Ecosistema de Innovación · Latam</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="relative w-20">
                      <Image
                        src="/assets/logo_goxt.png"
                        alt="GOxT"
                        width={80}
                        height={28}
                        className="object-contain dark:opacity-0 transition-opacity duration-300"
                        style={{ width: "80px", height: "28px" }}
                      />
                      <Image
                        src="/assets/logo_goxt_blanco.png"
                        alt="GOxT"
                        width={80}
                        height={28}
                        className="object-contain absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
                        style={{ width: "80px", height: "28px" }}
                      />
                    </div>
                    <Image
                      src="/assets/clientes/Nodo.svg"
                      alt="NODO"
                      width={80}
                      height={28}
                      className="object-contain"
                      style={{ width: "80px", height: "28px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: imagen */}
            <div className="md:col-span-4 col-span-12">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src="/assets/Conferencia.jpg"
                  alt="Demo Day Power Skills"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
