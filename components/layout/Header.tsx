import Image from 'next/image';
import Nav from './Nav';
import HeaderClient from './HeaderClient';

export default function Header() {
    return (
        <header className="fixed z-50 top-0 lg:top-none w-full h-16 lg:h-dvh flex shrink-0 bg-white text-black border-(--border-gray) divide-(--border-gray) lg:w-40 lg:flex-col lg:divide-y lg:border-r lg:shadow-lg lg:relative">
            <div className="flex flex-1 py-2 lg:px-4 lg:py-6 text-center justify-center lg:flex-none">
                <Image className="w-auto h-12 lg:w-auto lg:h-16" src="/images/logo.png" alt="Logo" width={394} height={186} priority loading="eager" />
            </div>
            <Nav className={'flex-1 hidden flex-col px-4 py-8 lg:flex'} />
            <div className="absolute top-1/2 -translate-y-1/2 right-0 lg:relative lg:w-full lg:top-0 lg:right-0 lg:translate-none flex items-center justify-center px-4 py-3">
                <HeaderClient />
            </div>
        </header>
    );
}