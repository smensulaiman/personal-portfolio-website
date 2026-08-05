import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

/**
 * Resolve a stored file path to a browser URL. Admin uploads are saved on the
 * public disk as relative paths ("portfolio/avatar.jpg"), while seeded
 * defaults point straight at files shipped in `public/` ("/solaimam-web.jpg").
 */
export function fileUrl(path: string | null | undefined): string | null {
    if (!path) {
        return null;
    }

    return path.startsWith('/') || path.startsWith('http')
        ? path
        : `/storage/${path}`;
}
