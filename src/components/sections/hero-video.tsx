"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const VIDEO = {
  mp4: "/videos/hero-demo.mp4",
  webm: "/videos/hero-demo.webm",
  poster: "/assets/hero/hero-demo-poster.jpg",
  title: "Demo de GOxT: pipeline de oportunidades",
};

function Sources() {
  return (
    <>
      <source src={VIDEO.webm} type="video/webm" />
      <source src={VIDEO.mp4} type="video/mp4" />
    </>
  );
}

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const resumeAfterModal = useRef(false);

  // Autoplay en silencio, salvo que el usuario prefiera menos movimiento.
  // `muted` se fija por JS porque React no lo refleja como atributo y Safari bloquea el autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => setPlaying(false));
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const openModal = () => {
    const video = videoRef.current;
    resumeAfterModal.current = !!video && !video.paused;
    video?.pause();
    setExpanded(true);
  };

  const onModalChange = (open: boolean) => {
    setExpanded(open);
    if (!open && resumeAfterModal.current) videoRef.current?.play().catch(() => {});
  };

  return (
    <>
      <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl shadow-black/10 dark:shadow-black/40">
        <video
          ref={videoRef}
          poster={VIDEO.poster}
          aria-label={VIDEO.title}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 size-full object-cover"
        >
          <Sources />
        </video>

        {/* Pausado: botón grande para reproducir */}
        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Reproducir video"
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30 cursor-pointer"
          >
            <span className="flex size-16 md:size-20 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur transition-transform hover:scale-105">
              <Play className="size-7 md:size-8 translate-x-0.5" fill="currentColor" />
            </span>
          </button>
        )}

        {/* Controles */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pausar video" : "Reproducir video"}
            className="flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow backdrop-blur transition-colors hover:bg-background cursor-pointer"
          >
            {playing ? <Pause className="size-4" fill="currentColor" /> : <Play className="size-4" fill="currentColor" />}
          </button>
          <button
            type="button"
            onClick={openModal}
            aria-label="Ver video en grande"
            className="flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow backdrop-blur transition-colors hover:bg-background cursor-pointer"
          >
            <Maximize2 className="size-4" />
          </button>
        </div>
      </div>

      <Dialog open={expanded} onOpenChange={onModalChange}>
        <DialogContent className="sm:max-w-6xl p-0 overflow-hidden bg-black ring-0">
          <DialogTitle className="sr-only">{VIDEO.title}</DialogTitle>
          <video
            poster={VIDEO.poster}
            aria-label={VIDEO.title}
            autoPlay
            muted
            controls
            playsInline
            className="aspect-video w-full"
          >
            <Sources />
          </video>
        </DialogContent>
      </Dialog>
    </>
  );
}
