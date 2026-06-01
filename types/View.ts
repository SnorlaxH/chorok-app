import { LucideIcon } from 'lucide-react'
import { CSSProperties } from 'react'

export type ViewProps = Readonly<{
    children?: React.ReactNode,
    className?: string,
    style?: CSSProperties,
    id?: string,
}>

export type IconButtonProps = Readonly<
    ViewProps
    & {
        icon?: React.ReactNode,
        title?: string,
        desc?: string,
        url: string,
    }>

export type MenuList = Readonly<{
    icon: LucideIcon,
    name: string,
    href: string,
}>

export type CalendarEvents = Readonly<{
    id: string,
    type: number,
    title: string,
    date: Date,
    desc: string,
    opt: { isHome?: boolean, url?: string },
}>

export type CalendarRecord = Readonly<
    Record<string, CalendarEvents[]>
>

export type CalendarPopupData = {
    item: CalendarEvents,
    ref: React.RefObject<HTMLElement | null>,
    isEdit?: boolean,
}

export type CalendarProps = Readonly<
    ViewProps
    & {
        current: Date,
        viewDate: Date,
        events?: CalendarRecord,
        onClick?: (item: CalendarEvents[] | null) => void,
    }>

export type PlaylistFilter = Readonly<{ artist: Record<string, number>; category: Record<string, number> }>;

export type PlaylistItem = Readonly<{
    id: string,
    title: string,
    artist: string,
    category: string,
    thumbnail: string,
}>

export type PlaylistProps = Readonly<
    ViewProps & { data: PlaylistItem }>