"use client";

import { motion } from "motion/react";
import { Marquee } from "@/components/shadcn-space/animations/marquee";

export const clients = [
  { src: "/assets/clientes/Copec.svg", name: "Copec" },
  { src: "/assets/clientes/SigdoKopers.svg", name: "Sigdo Kopers", darkClass: "dark:brightness-0 dark:invert" },
  { src: "/assets/clientes/logo-err.svg", name: "ERR Trans" },
  //{ src: "/assets/clientes/Logotipo-Maule-Costa.svg", name: "SLEP Maule Costa" },
  { src: "/assets/clientes/logo-andinos.svg", srcDark: "/assets/clientes/logo-andinos-white.svg", name: "Andinos" },
  { src: "/assets/clientes/SouthConnect.svg", srcDark: "/assets/clientes/SouthConnect-white.svg", name: "SouthConnect" },
  { src: "/assets/clientes/CamionGO.png", srcDark: "/assets/clientes/CamionGO White.png", name: "CamionGO" },
  { src: "/assets/clientes/Nodo.svg", name: "Nodo"},
];

export default function BrandSlider() {
  return (
    <section>
      <div className="py-6 md:py-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-3"
          >
            <div className="flex justify-center text-center py-3 md:py-4">
              <div className="flex items-center justify-center gap-4">
                <div className="hidden md:block h-0.5 w-40 bg-linear-to-l from-muted-foreground to-white dark:from-muted-foreground dark:to-transparent opacity-20" />
                <p className="text-sm font-normal sm:px-2 px-10 text-muted-foreground text-center">
                  Confían en GOxT
                </p>
                <div className="hidden md:block h-0.5 w-40 bg-linear-to-r from-muted-foreground to-white dark:from-muted-foreground dark:to-transparent opacity-20" />
              </div>
            </div>
            <div className="py-4">
              <Marquee pauseOnHover className="[--duration:25s] p-0">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center mx-6 lg:mx-14"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.src}
                      alt={client.name}
                      className={`h-8 w-auto object-contain ${client.srcDark ? "dark:hidden" : ""} ${client.darkClass ?? ""}`}
                    />
                    {client.srcDark && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={client.srcDark}
                        alt={client.name}
                        className="h-8 w-auto object-contain hidden dark:block"
                      />
                    )}
                  </div>
                ))}
              </Marquee>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
