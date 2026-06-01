'use client'

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import Badge from '@/components/common/Badge';
import Playlist from '@/components/Playlist/Playlist'
import { toChosung } from '@/libs/utils';
import { PlaylistFilter, PlaylistItem, ViewProps } from '@/types/View'

export default function PlaylistClient({ filter, data }: ViewProps & {
    filter: PlaylistFilter
    data: PlaylistItem[]
}) {
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [artistToggle, setArtistToggle] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [artistSelect, setArtistSelect] = useState<string[]>([]);

    const { artist } = filter;
    const sorted = Object.entries(artist).sort((a, b) => b[1] - a[1])

    const selectArtist = (k: string) => {
        setArtistSelect(prev => {
            if (prev.includes(k)) {
                return prev.filter(v => v !== k)
            }

            return [...prev, k]
        })
    };

    const artistSet = useMemo(() => {
        return new Set(artistSelect)
    }, [artistSelect]);

    const filterData = useMemo(() => {
        const q = keyword.trim().toLowerCase()
        const hasKeyword = q.length > 0
        const hasArtistFilter = artistSet.size > 0

        if (!hasKeyword && !hasArtistFilter) return data

        return data.filter((r: PlaylistItem) => {
            if (hasArtistFilter && !artistSet.has(r.artist)) {
                return false
            }

            if (!hasKeyword) {
                return true
            }

            const title = r.title.toLowerCase()
            const artist = r.artist.toLowerCase()
            const titleChosung = toChosung(r.title);
            const artistChosung = toChosung(r.artist);

            return (
                title.includes(q) ||
                artist.includes(q) ||
                titleChosung.includes(q) ||
                artistChosung.includes(q)
            )
        })
    }, [data, keyword, artistSet]);

    return (
        <>
            <div className="flex flex-col w-full lg:w-1/4 lg:h-full p-4 gap-2">
                <input type="text" onChange={(e) => setKeyword(e.currentTarget.value)} className={`border border-zinc-300 rounded px-4 py-2 outline-(--sub-color)`} placeholder="제목 또는 가수명 입력" />

                <div
                    className="hidden lg:flex rounded px-2 py-3 justify-between font-bold hover:bg-[rgba(0,0,0,0.1)]"
                    onClick={() => setCategoryToggle(!categoryToggle)}>
                    카테고리
                    {categoryToggle ? <ChevronUp /> : <ChevronDown />}
                </div>
                <div
                    style={{
                        opacity: categoryToggle ? 1 : 0
                    }}
                    className={`hidden lg:flex flex-wrap gap-2 transition-opacity duration-300`}>
                    {Object.entries(filter.category).map((value: [string, number]) => {
                        const [_category, _cnt] = value;
                        return (
                            <Badge className={`border border-zinc-400 text-black! hover:bg-[rgba(0,0,0,0.1)]`} key={_category}>{_category}({_cnt})</Badge>
                        )
                    })}
                </div>

                <div
                    className="hidden lg:flex rounded px-2 py-3 justify-between font-bold hover:bg-[rgba(0,0,0,0.1)]"
                    onClick={() => setArtistToggle(!artistToggle)}>
                    가수
                    {artistToggle ? <ChevronUp /> : <ChevronDown />}
                </div>
                <div
                    style={{
                        opacity: artistToggle ? 1 : 0
                    }}
                    className={`hidden lg:flex flex-wrap gap-2 transition-opacity duration-300`}>
                    {sorted.slice(0, sorted.length > 15 ? 15 : sorted.length).map((value: [string, number]) => {
                        const [_artist, _cnt] = value;
                        return (
                            <Badge
                                className={`border ${artistSelect.includes(_artist) ? 'border-(--sub-color) bg-(--sub-color) text-white!' : 'border-zinc-400 text-black!'} text-black! cursor-pointer hover:bg-[rgba(0,0,0,0.1)]`}
                                key={_artist}
                                onClick={() => selectArtist(_artist)}>{_artist}({_cnt})</Badge>
                        )
                    })}
                    <Badge className={`border border-zinc-400 text-black! cursor-pointer hover:bg-[rgba(0,0,0,0.1)]`}>+ 더보기</Badge>
                </div>
            </div>
            <div key={filterData.length} className="w-full lg:w-3/4 h-full grid grid-cols-2 lg:grid-cols-6 auto-rows-max content-start gap-4 p-4 bg-zinc-50 rounded overflow-auto">
                {filterData.map((r: PlaylistItem, index) => {
                    return (
                        <motion.div
                            key={r.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Playlist data={r} />
                        </motion.div>
                    )
                })}
            </div>
        </>
    )
}