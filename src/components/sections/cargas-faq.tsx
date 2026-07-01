"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  // Generadores de carga
  {
    question: "¿Cómo cotizar transporte de carga nacional?",
    answer:
      "Completa el formulario como generador y cuéntanos tu tipo de carga, volumen y frecuencia. Te conectamos con transportistas verificados y te ayudamos a gestionar la cotización.",
  },
  {
    question: "¿Buscas empresas de transporte de carga terrestre confiables?",
    answer:
      "A través de GOxT Network conectamos generadores con transportistas activos y validados en nuestra plataforma, para que operes con menos riesgo.",
  },
  {
    question: "¿Necesitas transporte de carga pesada o sobredimensionada para tu empresa?",
    answer:
      "Indícanos el tipo de carga en el formulario y evaluamos junto a nuestra red de transportistas qué equipo se ajusta a tu operación.",
  },
  // Transportistas
  {
    question: "¿Buscas una bolsa de cargas para tu camión?",
    answer:
      "GOxT Network funciona como un tablero de oportunidades: te conectamos con generadores de carga que necesitan mover mercadería, según tu tipo de equipo y zona.",
  },
  {
    question: "¿Cómo evitar viajes en vacío y conseguir cargas de retorno?",
    answer:
      "Al registrar tu flota y tu región de operación, te acercamos oportunidades de carga que calzan con tus rutas habituales, reduciendo los viajes en vacío.",
  },
  {
    question: "¿Buscas dadores de carga o contratos de transporte para tu flota?",
    answer:
      "Completa el formulario indicando cuántos camiones operas y te contactamos para evaluar oportunidades de contratos según tu capacidad.",
  },
  // Conductores
  {
    question: "¿Buscas trabajo de chofer de camiones articulados o ramplas?",
    answer:
      "Cuéntanos tu clase de licencia y experiencia en el formulario. Te conectamos con transportistas de nuestra red que buscan conductores.",
  },
  {
    question: "¿Tienes licencia A5 y buscas empleo como conductor?",
    answer:
      "Indícalo en el formulario junto con tus años de experiencia y si buscas vehículo propio o unirte a una flota, y te contactamos con oportunidades disponibles.",
  },
  {
    question: "¿Qué se requiere para transportar carga peligrosa?",
    answer:
      "Los requisitos varían según el tipo de carga y la normativa vigente. Cuéntanos en el formulario qué necesitas transportar o qué certificaciones tienes, y te orientamos según tu caso.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function CargasFaq() {
  return (
    <section className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="flex flex-col gap-3 items-center text-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Preguntas frecuentes
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            ¿Tienes estas dudas?
          </h2>
        </div>

        <Accordion type="single" defaultValue="item-0" aria-label="Preguntas frecuentes sobre cargas">
          {FAQS.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
