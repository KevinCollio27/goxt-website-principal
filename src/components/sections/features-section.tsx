"use client";

import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Target, Truck, Share2, BarChart2, Check, ArrowUpRight } from "lucide-react";
import { Badge } from "../ui/badge";

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">

        {/* Header general */}
        <div className="text-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Nuestros Productos
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Todo lo que necesita tu operación,<br className="hidden md:block" /> en un solo lugar.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dos productos potentes que trabajan mejor juntos.
            Desde el primer contacto hasta la entrega final.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="crm" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="h-auto p-1 gap-1">
              <TabsTrigger value="crm" className="flex items-center gap-2 px-4 py-2 rounded-full">
                <Target className="size-4" />
                CRM
              </TabsTrigger>
              <TabsTrigger value="cargo" className="flex items-center gap-2 px-4 py-2 rounded-full">
                <Truck className="size-4" />
                Cargo
              </TabsTrigger>
              <TabsTrigger value="network" className="flex items-center gap-2 px-4 py-2 rounded-full">
                <Share2 className="size-4" />
                Network
              </TabsTrigger>
              <TabsTrigger value="bi" className="flex items-center gap-2 px-4 py-2 rounded-full">
                <BarChart2 className="size-4" />
                BI
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab CRM */}
          <TabsContent value="crm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    GOxT CRM
                  </p>
                  <h3 className="text-3xl md:text-4xl font-medium leading-tight tracking-tight">
                    De leads a clientes,<br />sin perder ninguna oportunidad.
                  </h3>
                  <p className="text-muted-foreground">
                    El CRM que habla el idioma de tu operación. Pipeline visual, cotizaciones en minutos y seguimiento automático para que ninguna venta se pierda en el camino.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    "Pipeline interactivo Kanban",
                    "Cotizaciones dinámicas en minutos",
                    "Seguimiento automático de oportunidades",
                    "Reportes y dashboards en tiempo real",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <Check className="size-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3">
                  <Button asChild className="relative text-sm font-medium rounded-full h-10 p-1 ps-5 pe-11 group transition-all duration-500 hover:ps-11 hover:pe-5 w-fit overflow-hidden cursor-pointer">
                    <a href="https://calendar.app.google/1nbeEzv7YSstAzQL8" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 transition-all duration-500">Solicitar Demo</span>
                      <span className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
                        <ArrowUpRight size={14} />
                      </span>
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
                <Image src="/assets/features/CRM.jpg" alt="GOxT CRM" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" priority />
              </div>
            </div>
          </TabsContent>

          {/* Tab Cargo */}
          <TabsContent value="cargo">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    GOxT Cargo
                  </p>
                  <h3 className="text-3xl md:text-4xl font-medium leading-tight tracking-tight">
                    Control total de tu flota<br />desde un solo lugar.
                  </h3>
                  <p className="text-muted-foreground">
                    Trazabilidad en tiempo real, documentos digitales y alertas automáticas. Sin llamadas para saber dónde está tu carga ni en qué estado va cada despacho.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    "Tracking de flota en tiempo real",
                    "Documentos digitales integrados",
                    "Alertas y notificaciones automáticas",
                    "Menos kilómetros vacíos",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <Check className="size-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3">
                  <Button asChild className="relative text-sm font-medium rounded-full h-10 p-1 ps-5 pe-11 group transition-all duration-500 hover:ps-11 hover:pe-5 w-fit overflow-hidden cursor-pointer">
                    <a href="https://calendar.app.google/1nbeEzv7YSstAzQL8" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 transition-all duration-500">Solicitar Demo</span>
                      <span className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
                        <ArrowUpRight size={14} />
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
                <Image src="/assets/features/Cargo.jpg" alt="GOxT Cargo" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
              </div>
            </div>
          </TabsContent>

          {/* Tab Network */}
          <TabsContent value="network">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    GOxT Network
                  </p>
                  <h3 className="text-3xl md:text-4xl font-medium leading-tight tracking-tight">
                    Conecta tu operación con<br />tus clientes en tiempo real.
                  </h3>
                  <p className="text-muted-foreground">
                    Comparte el estado de cada servicio con tus clientes sin correos ni llamadas. Más transparencia, más confianza, menos fricción operacional.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    "Portal de clientes en tiempo real",
                    "Visibilidad del estado de servicios",
                    "Menos consultas de seguimiento",
                    "Integrado con CRM y Cargo",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <Check className="size-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3">
                  <Button asChild className="relative text-sm font-medium rounded-full h-10 p-1 ps-5 pe-11 group transition-all duration-500 hover:ps-11 hover:pe-5 w-fit overflow-hidden cursor-pointer">
                    <a href="https://calendar.app.google/1nbeEzv7YSstAzQL8" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 transition-all duration-500">Solicitar Demo</span>
                      <span className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
                        <ArrowUpRight size={14} />
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
                <Image src="/assets/features/Network.jpg" alt="GOxT Network" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
              </div>
            </div>
          </TabsContent>

          {/* Tab BI */}
          <TabsContent value="bi">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    GOxT BI
                  </p>
                  <h3 className="text-3xl md:text-4xl font-medium leading-tight tracking-tight">
                    Deja de operar con intuición.<br />Usa datos reales.
                  </h3>
                  <p className="text-muted-foreground">
                    Dashboards automáticos con los KPIs que importan. Ventas, logística y operaciones en un solo panel. Decisiones más rápidas, resultados medibles.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    "Dashboards automáticos",
                    "KPIs de ventas y logística unificados",
                    "Reportes exportables",
                    "Integrado con CRM y Cargo",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <Check className="size-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3">
                  <Button asChild className="relative text-sm font-medium rounded-full h-10 p-1 ps-5 pe-11 group transition-all duration-500 hover:ps-11 hover:pe-5 w-fit overflow-hidden cursor-pointer">
                    <a href="https://calendar.app.google/1nbeEzv7YSstAzQL8" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 transition-all duration-500">Solicitar Demo</span>
                      <span className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
                        <ArrowUpRight size={14} />
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
                <Image src="/assets/features/BI.jpg" alt="GOxT BI" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </section>
  );
}
