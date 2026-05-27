"use client";

import { useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { motion, useInView } from "motion/react";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    image: string;
    logoSrc: string;
    logoAlt: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Antes coordinábamos toda nuestra operación logística y comercial entre Excel y grupos de WhatsApp. Hoy tenemos trazabilidad completa, cotizaciones en minutos y el equipo trabajando desde un solo lugar.",
        author: "Rodrigo Valdés",
        role: "CEO · CamionGO",
        image: "/assets/testimonios/Rodrigo.png",
        logoSrc: "/assets/clientes/CamionGO.png",
        logoAlt: "CamionGO",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section ref={sectionRef}>
            <div className="max-w-7xl mx-auto sm:px-16 px-4 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                    className="flex flex-col gap-3"
                >
                    <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
                        Testimonios
                    </Badge>
                    <h2 className="sm:text-5xl text-xl leading-none font-medium tracking">
                        Casos reales de Éxito
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                    className="pt-12 pb-8"
                >
                    <Carousel>
                        <CarouselContent>
                            {testimonials.map((t, index) => (
                                <CarouselItem key={index}>
                                    <div className="grid grid-cols-12 gap-6 items-center">

                                        {/* Columna izquierda: comilla + quote + autor */}
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
                                            <div className="flex flex-col gap-12">
                                                <p className="sm:text-4xl text-xl text-muted-foreground">
                                                    {t.quote}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-base font-medium">{t.author}</p>
                                                        <p className="text-sm text-muted-foreground">{t.role}</p>
                                                    </div>
                                                    <Image
                                                        src={t.logoSrc}
                                                        alt={t.logoAlt}
                                                        width={120}
                                                        height={40}
                                                        className="object-contain"
                                                        style={{ width: "120px", height: "40px" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Columna derecha: foto */}
                                        <div className="md:col-span-4 col-span-12">
                                            <div className="rounded-xl overflow-hidden">
                                                <Image
                                                    src={t.image}
                                                    alt={t.author}
                                                    width={500}
                                                    height={500}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-top-20 left-auto right-12 size-8 cursor-pointer" />
                        <CarouselNext className="-top-20 right-0 size-8 cursor-pointer" />
                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
}
