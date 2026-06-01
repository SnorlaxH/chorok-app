import { PlaylistProps } from '@/types/View';
import Image from 'next/image';
import Badge from '../common/Badge';

export default function Playlist({ data, categoryColor }: PlaylistProps & { categoryColor?: string[] }) {
    const bgColors = categoryColor ?? ['#6FAEA3', '#B79AD9', '#F6C95B'];

    return (
        <>
            <div className="flex flex-col h-fit justify-center hover:scale-[1.02] transition-all duration-300">
                <Image className="self-center rounded w-auto h-40 object-fill" src={data.thumbnail} width={200} height={200} alt={data.title}></Image>
                <div className="flex flex-col gap-1">
                    <h4 className="font-bold! text-(--sub-color) mt-2!">{data.title}</h4>
                    <h4 className="">{data.artist}</h4>
                    <div className="flex gap-2">{data.category.split(',').map((cate, index) => {
                        const pos = index % data.category.length
                        return (<Badge key={cate} color={bgColors[pos]}>{cate}</Badge>)
                    })
                    }</div>
                </div>
            </div>
        </>
    )
}