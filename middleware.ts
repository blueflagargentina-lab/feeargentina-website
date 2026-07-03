import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale } from '@/lib/i18n';

const LEGACY_REDIRECTS: Array<{ pattern: RegExp; replace: (m: RegExpMatchArray) => string }> = [
  { pattern: /^\/categorias\/(.+)$/, replace: (m) => `/${defaultLocale}/category/${m[1]}` },
  { pattern: /^\/noticias\/(.+)$/, replace: (m) => `/${defaultLocale}/news/${m[1]}` },
  { pattern: /^\/acerca-de\/?$/, replace: () => `/${defaultLocale}/about` },
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  for (const { pattern, replace } of LEGACY_REDIRECTS) {
    const match = pathname.match(pattern);
    if (match) {
      return NextResponse.redirect(new URL(replace(match), request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/categorias/:path*', '/noticias/:path*', '/acerca-de'],
};
