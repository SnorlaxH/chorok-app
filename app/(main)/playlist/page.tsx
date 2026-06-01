import { PlaylistFilter, PlaylistItem } from '@/types/View';
import PlaylistClient from './PlaylistClient';

async function getData(): Promise<PlaylistItem[]> {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/api/playlist`, {
            next: { revalidate: 600 },
            signal: AbortSignal.timeout(5000)
        });
        const { data } = await res.json()

        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.error('Failed to fetch Playlist data:', e);
        return [];
    }
}

export default async function PlaylistPage() {
    const data = await getData();

    const filter: PlaylistFilter = {
        artist: {},
        category: {},
    }

    data.forEach((r: PlaylistItem) => {
        r.artist.split(',').forEach((s: string) => {
            if (!filter.artist.hasOwnProperty(s)) {
                filter.artist[s] = 0;
            }
            filter.artist[s]++;
        });
        r.category.split(',').forEach((s: string) => {
            if (!filter.category.hasOwnProperty(s)) {
                filter.category[s] = 0;
            }
            filter.category[s]++;
        });
    })

    return (
        <>
            <div className={`w-full h-full flex flex-col lg:flex-row bg-white`}>
                <PlaylistClient filter={filter} data={data}/>
            </div >
        </>
    )
}