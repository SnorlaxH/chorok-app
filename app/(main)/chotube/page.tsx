import Image from 'next/image'
import { toStr } from '@/libs/utils';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { ChotubeData } from '@/types/Common';

export const dynamic = 'force-dynamic'

async function getData(): Promise<ChotubeData[]> {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/api/youtube`, {
            next: { revalidate: 600 },
        });
        const { data } = await res.json()

        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.error('Failed to fetch Chotube data:', e);
        return [];
    }
}

export default async function ChotubePage() {
    const data = await getData();
    return (
        <>
            <div className={`w-full h-full flex p-4 lg:p-8`}>
                <div className="w-full h-full flex flex-col">
                    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 overflow-auto gap-4">
                        {data.map((r: ChotubeData) => {
                            return (
                                <Link
                                    key={r.videoId}
                                    className={`flex flex-col`}
                                    href={`https://www.youtube.com/watch?v=${r.videoId}`}
                                    target="_blank">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                        <Image
                                            src={r.thumbnail}
                                            alt={r.title}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 25vw, 50vw"
                                            loading="eager"
                                        />
                                    </div>

                                    <div className="w-full mt-2 truncate">{r.title}</div>
                                    <div className="text-sm text-zinc-400">
                                        {toStr(new Date(r.published)) ?? ''}
                                    </div>
                                </Link>
                            )
                        })}
                        <div className={`${data.length ? 'flex flex-col' : 'hidden'} justify-center items-center`}>
                            <Link className="flex flex-col justify-center items-center relative lg:-top-5"
                                href={`https://www.youtube.com/@tachocho`}
                                target="_blank">
                                <MoveRight /> 더보기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}