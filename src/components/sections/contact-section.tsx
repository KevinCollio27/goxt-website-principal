import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="pt-10 md:pt-16 pb-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:gap-24">

          {/* Columna izquierda */}
          <div className="flex flex-1 flex-col gap-10">
            <div>
              <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
                ¿Hablamos de tu operación?
              </h1>
              <p className="text-muted-foreground">
                Cuéntanos qué está frenando tu negocio hoy.
                En 30 minutos te mostramos si GOxT puede
                ordenarlo — sin compromiso, sin PowerPoint.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <a href="https://wa.me/56929184887" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                <PhoneIcon className="size-5 text-muted-foreground" />
                <span className="group-hover:underline">+56 9 2918 4887</span>
              </a>
              <a href="mailto:contacto@goxt.io" className="group flex items-center gap-3">
                <MailIcon className="size-5 text-muted-foreground" />
                <span className="group-hover:underline">contacto@goxt.io</span>
              </a>
              <a href="https://goxt.io" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                <GlobeIcon className="size-5 text-muted-foreground" />
                <span className="group-hover:underline">goxt.io</span>
              </a>
            </div>
          </div>

          {/* Columna derecha — iframe CRM */}
          <div className="flex-1">
            <iframe
              src="https://crm.goxt.io/widget/form/formulario-website"
              width="100%"
              height="700"
              style={{ border: "none", borderRadius: "16px" }}
              title="Formulario Website"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
