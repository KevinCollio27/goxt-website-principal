import Image from "next/image";

export default function PowerSkillsEcosistema() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto flex flex-col gap-12">

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-5">

          {/* Fila 1: Card grande izquierda */}
          <div className="lg:col-span-7 col-span-12 overflow-hidden">
            <div className="rounded-xl border border-border h-full flex flex-col">
              <div className="relative min-h-72 overflow-hidden rounded-t-xl flex-1">
                <Image
                  src="/assets/bento/Empresas.jpg"
                  alt="Empresas y Organizaciones"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-4 p-8 border-t border-border">
                <div>
                  <h3 className="text-xl font-medium">Empresas y Organizaciones</h3>
                  <p className="text-base text-muted-foreground mt-1">
                    Trabajamos con empresas reales que traen desafíos reales al programa.
                  </p>
                </div>
                <div className="flex items-center gap-6 flex-wrap">
                  <Image
                    src="/assets/clientes/Copec.svg"
                    alt="Copec"
                    width={64}
                    height={24}
                    className="object-contain opacity-70"
                    style={{ width: "64px", height: "24px" }}
                  />
                  <Image
                    src="/assets/clientes/logo-err.svg"
                    alt="ERR Trans"
                    width={64}
                    height={24}
                    className="object-contain opacity-70"
                    style={{ width: "64px", height: "24px" }}
                  />
                  <Image
                    src="/assets/clientes/logo-andinos.svg"
                    alt="Andinos"
                    width={64}
                    height={24}
                    className="object-contain opacity-70"
                    style={{ width: "64px", height: "24px" }}
                  />
                  <span className="text-sm text-muted-foreground">SLEP · y más</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fila 1: Columna derecha apilada */}
          <div className="lg:col-span-5 col-span-12 flex flex-col gap-5">

            {/* Card derecha arriba: Instituciones */}
            <div className="rounded-xl border border-border overflow-hidden flex-1 flex flex-col">
              <div className="relative overflow-hidden rounded-t-xl flex-1 min-h-36">
                <Image
                  src="/assets/bento/Instituciones.jpg"
                  alt="Instituciones Académicas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-1 p-6 border-t border-border">
                <h3 className="text-xl font-medium">Instituciones Académicas</h3>
                <p className="text-base text-muted-foreground">
                  Integramos el programa en universidades e institutos.
                </p>
              </div>
            </div>

            {/* Card derecha abajo: Gobiernos */}
            <div className="rounded-xl border border-border overflow-hidden flex-1 flex flex-col">
              <div className="relative overflow-hidden rounded-t-xl flex-1 min-h-36">
                <Image
                  src="/assets/bento/Gobierno.jpg"
                  alt="Gobiernos y Organizaciones"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-1 p-6 border-t border-border">
                <h3 className="text-xl font-medium">Gobiernos y Organizaciones</h3>
                <p className="text-base text-muted-foreground">
                  Alianzas con organismos públicos para generar impacto real.
                </p>
              </div>
            </div>

          </div>

          {/* Fila 2: Mentores */}
          <div className="lg:col-span-6 col-span-12 overflow-hidden">
            <div className="rounded-xl border border-border h-full flex flex-col">
              <div className="relative overflow-hidden rounded-t-xl min-h-52 flex-1">
                <Image
                  src="/assets/bento/Mentorias.jpg"
                  alt="+100 Mentores y Expertos"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-1 p-8 border-t border-border">
                <h3 className="text-xl font-medium">+100 Mentores y Expertos</h3>
                <p className="text-base text-muted-foreground">
                  Profesionales de la industria que acompañan cada proyecto.
                </p>
              </div>
            </div>
          </div>

          {/* Fila 2: GOxT */}
          <div className="lg:col-span-6 col-span-12 overflow-hidden">
            <div className="rounded-xl border border-border h-full flex flex-col">
              <div className="bg-muted rounded-t-xl p-8 flex-1 flex items-center justify-center min-h-40">
                <div className="relative w-35">
                  <Image
                    src="/assets/logo_goxt.png"
                    alt="GOxT"
                    width={140}
                    height={48}
                    className="object-contain dark:opacity-0 transition-opacity duration-300"
                    style={{ width: "140px", height: "48px" }}
                  />
                  <Image
                    src="/assets/logo_goxt_blanco.png"
                    alt="GOxT"
                    width={140}
                    height={48}
                    className="object-contain absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
                    style={{ width: "140px", height: "48px" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 p-8 border-t border-border">
                <h3 className="text-xl font-medium">GOxT</h3>
                <p className="text-base text-muted-foreground">
                  Tecnología + ecosistema para escalar lo que funciona.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
