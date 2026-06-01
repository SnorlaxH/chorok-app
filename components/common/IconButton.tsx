import { IconButtonProps } from '@/types/View';
import Link from 'next/link';

export default function IconButton({ className, icon, title, desc, url }: IconButtonProps) {
    return (
        <Link href={url}>
            <div className={`flex items-center px-4 py-2 gap-4 rounded-2xl bg-white border border-zinc-100 shadow-md transition duration-500 hover:border-(--main-color) ${className}`}>
                <div className="flex items-center justify-center text-2xl shrink-0">{icon}</div>
                <div className="flex flex-col">
                    <div className="font-bold">{title}</div>
                    <div className="text-sm text-zinc-400">{desc}</div>
                </div>
            </div>
        </Link>
    )
}