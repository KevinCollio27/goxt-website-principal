"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

const navItems = [
  { title: "Inicio", href: "/" },
  { title: "Soluciones", href: "/soluciones" },
  { title: "Power Skills", href: "/skills" },
  { title: "Planes", href: "/planes" },
  { title: "Blog", href: "/blog" },
  { title: "Contacto", href: "/contacto" },
];

const DEMO_URL = "/demo";

const DemoButton = ({ className }: { className?: string }) => (
  <Button
    asChild
    className={cn(
      "relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden cursor-pointer",
      className
    )}
  >
    <a href={DEMO_URL}>
      <span className="relative z-10 transition-all duration-500">
        Solicitar Demo
      </span>
      <span className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </a>
  </Button>
);

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className={cn("w-9 h-9", className)} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "relative w-9 h-9 rounded-full border border-border flex items-center justify-center transition-colors hover:bg-muted",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Sun size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Moon size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="inset-x-0 z-50 px-4 flex items-center justify-center sticky top-0 h-20"
    >
      <div
        className={cn(
          "w-full max-w-6xl flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
          sticky
            ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Logo */}
        <a href="/" className="relative block w-30">
          <Image
            src="/assets/logo_goxt.png"
            alt="GOxT"
            width={120}
            height={40}
            className="dark:opacity-0 transition-opacity duration-300"
            style={{ width: "120px", height: "40px" }}
            priority
          />
          <Image
            src="/assets/logo_goxt_blanco.png"
            alt="GOxT"
            width={120}
            height={40}
            className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
            style={{ width: "120px", height: "40px" }}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <NavigationMenu className="max-lg:hidden bg-muted p-0.5 rounded-full">
          <NavigationMenuList className="flex gap-0">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  href={item.href}
                  className="px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal"
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA + Mobile Menu */}
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          <a
            href="/plataformas"
            className="hidden lg:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Iniciar Sesión
          </a>
          <DemoButton className="hidden lg:flex" />

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <span className="rounded-full border border-border p-2 block">
                  <Menu width={20} height={20} />
                  <span className="sr-only">Menú</span>
                </span>
              </SheetTrigger>
              <SheetContent
                showCloseButton={false}
                side="right"
                className="w-full sm:w-96 p-0 border-l-0"
              >
                <div className="flex items-center justify-between p-6">
                  <a href="#" className="relative block w-27.5">
                    <Image
                      src="/assets/logo_goxt.png"
                      alt="GOxT"
                      width={110}
                      height={36}
                      className="dark:opacity-0 transition-opacity duration-300"
                      style={{ width: "110px", height: "36px" }}
                    />
                    <Image
                      src="/assets/logo_goxt_blanco.png"
                      alt="GOxT"
                      width={110}
                      height={36}
                      className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
                      style={{ width: "110px", height: "36px" }}
                    />
                  </a>
                  <SheetClose>
                    <span className="rounded-full border border-border p-2.5 block">
                      <X width={16} height={16} />
                    </span>
                  </SheetClose>
                </div>
                <div className="flex flex-col gap-12 px-6 pb-6 overflow-y-auto">
                  <div className="flex flex-col gap-8">
                    <SheetTitle className="sr-only">Menú</SheetTitle>
                    <NavigationMenu
                      orientation="vertical"
                      className="items-start flex-none"
                    >
                      <NavigationMenuList className="flex flex-col items-start gap-3">
                        {navItems.map((item) => (
                          <NavigationMenuItem key={item.title}>
                            <NavigationMenuLink
                              href={item.href}
                              className="flex items-center text-2xl font-semibold tracking-tight transition-all p-0 hover:bg-transparent focus:bg-transparent text-muted-foreground hover:text-foreground hover:translate-x-2"
                            >
                              {item.title}
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                    <DemoButton />
                    <a
                      href="/plataformas"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Iniciar Sesión
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mt-auto">
                    © 2026 GOxT
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
