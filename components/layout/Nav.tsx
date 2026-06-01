'use client'

import { MenuList } from '@/constants/route';
import { ViewProps } from '@/types/View';
import Link from 'next/link';

import { usePathname } from 'next/navigation'

export default function Nav({ className }: ViewProps) {
    const pathname = usePathname();
    return (
        <nav className={`${className} gap-4`}>
            {MenuList.map((r) => {
                const key = `nav-${r.href.slice(1)}`;
                const Icon = r.icon;
                return (
                    <div
                        key={key}
                        className="h-full lg:h-auto size-10 lg:size-auto"
                    >
                        <Link
                            href={r.href}
                            className={`flex flex-col lg:flex-row text-sm lg:text-base text-black gap-1 lg:gap-2 items-center hover:text-(--sub-color)`}
                            style={{
                                color: `${pathname === r.href ? 'var(--sub-color)' : ''}`
                            }}>
                            <Icon size={20} />{r.title}
                        </Link>
                    </div>
                )
            })}
        </nav>
    )
}