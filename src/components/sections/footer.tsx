import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="currentColor" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#goxt-linkedin-clip)">
      <path d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="goxt-linkedin-clip">
        <path d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#goxt-instagram-clip)">
      <path d="M12 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.228.413.56.218.96.478 1.38.898s.68.82.898 1.38c.164.423.36 1.058.413 2.228.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.228a3.7 3.7 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.249-2.228-.413a3.7 3.7 0 0 1-1.38-.898c-.42-.42-.68-.82-.898-1.38-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38s.82-.68 1.38-.898c.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.131 4.902.333 4.14.63a5.9 5.9 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.14c-.297.763-.5 1.635-.558 2.912C.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.15.558 2.912.307.79.717 1.459 1.384 2.126A5.9 5.9 0 0 0 4.14 23.37c.763.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.912-.558a5.9 5.9 0 0 0 2.126-1.384 5.9 5.9 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.912a5.9 5.9 0 0 0-1.384-2.126A5.9 5.9 0 0 0 19.86.63c-.763-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.846-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="goxt-instagram-clip">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

const footerSections = [
  {
    title: "Navegación",
    links: [
      { title: "Soluciones", href: "/soluciones" },
      { title: "Power Skills", href: "/skills" },
      { title: "Planes", href: "/planes" },
      { title: "Blog", href: "/blog" },
      { title: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacidad", href: "/privacidad" },
      { title: "Términos & Condiciones", href: "/terminos" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="py-10">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
        <div className="flex flex-col gap-6 sm:gap-12">
          <div className="py-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-x-8 gap-y-10 px-6 xl:px-0">

            {/* Logo + tagline + redes */}
            <div className="col-span-full lg:col-span-4">
              <div className="flex flex-col gap-6 ">
                <a href="#" className="relative block w-30">
                  <Image
                    src="/assets/logo_goxt.png"
                    alt="GOxT"
                    width={120}
                    height={40}
                    className="dark:opacity-0 transition-opacity duration-300"
                    style={{ width: "120px", height: "40px" }}
                  />
                  <Image
                    src="/assets/logo_goxt_blanco.png"
                    alt="GOxT"
                    width={120}
                    height={40}
                    className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
                    style={{ width: "120px", height: "40px" }}
                  />
                </a>
                <p className="text-base font-normal text-muted-foreground text-justify">
                  Construimos tecnología para que operes mejor, vendas más y pierdas menos tiempo en el caos operacional.
                </p>
                <div className="flex items-center gap-4">
                  <a href="https://www.facebook.com/people/GOXT/61587279490575/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <FacebookIcon />
                  </a>
                  <a href="https://www.linkedin.com/company/goxt/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <LinkedinIcon />
                  </a>
                  <a href="https://www.instagram.com/goxt_innovacion/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <InstagramIcon />
                  </a>
                  <a href="https://wa.me/56929184887" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:block hidden" />

            {/* Navegación + Legal */}
            {footerSections.map(({ title, links }, index) => (
              <div key={index} className="col-span-2">
                <div className="flex flex-col gap-4 ">
                  <p className="text-base font-medium text-foreground">{title}</p>
                  <ul className="flex flex-col gap-3">
                    {links.map(({ title, href }) => (
                      <li key={title}>
                        <a href={href} className="text-base font-normal text-muted-foreground hover:text-foreground">
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Contacto */}
            <div className="col-span-3">
              <div className="flex flex-col gap-4 ">
                <p className="text-base font-medium text-foreground">Contacto</p>
                <ul className="flex flex-col gap-3">
                  <li>
                    <p className="text-base font-normal text-muted-foreground">
                      Santiago, Chile
                    </p>
                  </li>
                  <li>
                    <a href="mailto:contacto@goxt.io" className="text-base font-normal text-muted-foreground hover:text-foreground">
                      contacto@goxt.io
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/56929184887" target="_blank" rel="noopener noreferrer" className="text-base font-normal text-muted-foreground hover:text-foreground">
                      +56 9 2918 4887
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <Separator orientation="horizontal" />

          <p className="text-sm font-normal text-muted-foreground text-center ">
            © 2026 GOxT SPA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
