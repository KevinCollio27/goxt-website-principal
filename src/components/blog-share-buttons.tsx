"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
}

const shareItems = [
  {
    label: "WhatsApp",
    icon: "mdi:whatsapp",
    color: "#25D366",
    getHref: (title: string, url: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    label: "LinkedIn",
    icon: "mdi:linkedin",
    color: "#0A66C2",
    getHref: (_title: string, url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "X",
    icon: "ri:twitter-x-fill",
    color: "currentColor",
    getHref: (title: string, url: string) =>
      `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
];

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => window.location.href;

  const handleShare = (getHref: (t: string, u: string) => string) => {
    window.open(getHref(title, getUrl()), "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnClass =
    "w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-pointer";

  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-xs text-muted-foreground">Compartir:</span>
      {shareItems.map((item) => (
        <button
          key={item.label}
          type="button"
          aria-label={`Compartir en ${item.label}`}
          onClick={() => handleShare(item.getHref)}
          className={btnClass}
        >
          <Icon icon={item.icon} width={16} height={16} color={item.color} />
        </button>
      ))}
      <button
        type="button"
        aria-label="Copiar enlace"
        onClick={handleCopy}
        className={cn(btnClass, copied && "border-foreground text-foreground")}
      >
        {copied ? <Check size={13} /> : <Link2 size={13} />}
      </button>
    </div>
  );
}
