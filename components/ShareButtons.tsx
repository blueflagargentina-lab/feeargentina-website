'use client';

import { useState } from 'react';

interface ShareDict {
  label: string;
  copyLink: string;
  linkCopied: string;
}

export default function ShareButtons({
  title,
  url,
  dict,
}: {
  title: string;
  url: string;
  dict: ShareDict;
}) {
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
      <span className="text-sm font-semibold text-marine-800">{dict.label}</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${l.label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-celeste-200 text-base transition hover:bg-celeste-300"
        >
          {l.icon}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="rounded-full bg-celeste-200 px-3 py-1.5 text-xs font-semibold text-marine-800 transition hover:bg-celeste-300"
      >
        {copied ? dict.linkCopied : dict.copyLink}
      </button>
    </div>
  );
}
