'use client';

import { FormEvent, useState } from 'react';
import { Locale, getDictionary } from '@/lib/i18n';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).newsletter;
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div id="newsletter" className="rounded-xl bg-marine-800 p-5 text-white shadow-card">
      <h3 className="text-lg font-bold">{dict.title}</h3>
      <p className="mt-1 text-sm text-celeste-200">{dict.description}</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
        <input
          type="email"
          required
          placeholder={dict.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-marine-600 bg-marine-900 px-3 py-2 text-sm text-white placeholder:text-celeste-300/60 focus:border-celeste-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-md bg-eco-500 px-3 py-2 text-sm font-semibold transition hover:bg-eco-600 disabled:opacity-60"
        >
          {status === 'loading' ? dict.buttonLoading : dict.button}
        </button>
        {status === 'success' && <p className="text-xs text-eco-400">{dict.success}</p>}
        {status === 'error' && <p className="text-xs text-red-300">{dict.error}</p>}
      </form>
    </div>
  );
}
