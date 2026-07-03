'use client';

import { useState } from 'react';

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'WhatsApp',
      icon: '💬',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: 'X',
      icon: '🐦',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: 'Facebook',
      icon: '📘',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'LinkedIn',
      icon: '💼',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, ignore
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-marine-800">Compartir:</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Compartir en ${l.label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-celeste-200 text-base transition hover:bg-celeste-300"
        >
          {l.icon}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="rounded-full bg-celeste-200 px-3 py-1.5 text-xs font-semibold text-marine-800 transition hover:bg-celeste-300"
      >
        {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
      </button>
    </div>
  );
}
