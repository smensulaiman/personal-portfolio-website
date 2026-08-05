import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
    children: React.ReactNode;
    /** Stagger in milliseconds, applied once the element enters the viewport. */
    delay?: number;
    className?: string;
    as?: 'div' | 'li' | 'article' | 'section';
};

/**
 * Fades content up the first time it scrolls into view. Falls back to
 * immediately visible when IntersectionObserver is unavailable.
 */
export function Reveal({
    children,
    delay = 0,
    className,
    as: Tag = 'div',
}: Props) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element || typeof IntersectionObserver === 'undefined') {
            setVisible(true);

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref as React.Ref<never>}
            className={cn('pf-reveal', visible && 'pf-visible', className)}
            style={{ '--pf-reveal-delay': `${delay}ms` } as React.CSSProperties}
        >
            {children}
        </Tag>
    );
}
