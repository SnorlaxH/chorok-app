'use client'

import { useState } from 'react'

import PcCalendar from './PcCalendar'
import MobileCalendar from './MobileCalendar'

import { ChevronLeft, ChevronRight, Icon, Plane } from 'lucide-react'
import { getFirstDateOfWeek, getLastDateOfWeek, toStr } from '@/libs/utils'
import { CalendarEvents, ViewProps } from '@/types/View'
import { useIsMobile } from '@/hooks/core'
import { SCHE_EVENT_TYPE } from '@/constants/schedule'
import Link from 'next/link'
import { baseball } from '@lucide/lab'

export default function ScheduleClient({ events }: ViewProps & { events: CalendarEvents[] }) {
    const isMobile = useIsMobile()
    const [current, setCurrent] = useState(
        () => new Date(),
    )
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvents[] | null>(null);

    const today = new Date()

    const moveMonth = (value: number) => {
        setCurrent((prev) => {
            const next = new Date(prev)

            if (isMobile) {
                next.setDate(next.getDate() + value * 7)
            } else {
                next.setMonth(next.getMonth() + value)
            }
            setCalendarEvents(null);
            return next
        })
    }

    const data = events.reduce<
        Record<string, CalendarEvents[]>
    >((acc, event) => {
        const key = toStr(event.date, 'yyyy-MM-dd')

        if (!acc[key]) {
            acc[key] = []
        }

        acc[key].push(event)

        return acc
    }, {})

    const handleScroll = (e: React.WheelEvent) => {
        moveMonth(e.deltaY > 0 ? 1 : -1)
    }

    return (
        <>
            <div className="flex justify-center lg:justify-normal items-center gap-4">
                <button
                    type="button"
                    onClick={() => moveMonth(-1)}
                    className="cursor-pointer pointer-events-auto"
                >
                    <ChevronLeft
                        className="pointer-events-none"
                        size={30} />
                </button>

                <div className="text-2xl font-bold">
                    <span className="hidden lg:inline">
                        {toStr(current, 'yyyy. MM')}
                    </span>

                    <span className="inline lg:hidden">
                        {toStr(getFirstDateOfWeek(current), 'MM. dd')} ~ {toStr(getLastDateOfWeek(current), 'MM. dd')}
                    </span>
                </div>


                <button
                    type="button"
                    onClick={() => moveMonth(1)}
                    className="cursor-pointer pointer-events-auto"
                >
                    <ChevronRight size={30} />
                </button>
            </div>

            <div className="hidden w-full h-full lg:flex">
                <div className="grid w-full lg:w-4/5 h-full" onWheel={(e) => handleScroll(e)}>
                    <PcCalendar
                        current={current}
                        viewDate={today}
                        events={data}
                        onClick={(item) => setCalendarEvents(item)}
                    />
                </div>
                <div className="hidden flex-col ml-4 lg:flex lg:w-1/5 h-full px-4 py-2 rounded-xl shadow-xl bg-white">
                    {calendarEvents?.map((item) => {
                        const isHome = item.opt?.isHome;
                        const size = 20;
                        const desc = (
                            <>
                                {isHome ? <Icon className="text-(--sub-color)" size={size} iconNode={baseball} /> : <Plane className="text-(--sub-color)" size={size} />}
                                {isHome ? '홈' : '원정'}
                            </>
                        );
                        return (
                            <div key={item.id} className="flex flex-col py-3 gap-1 text-black border-b border-zinc-300">
                                <span className="text-sm text-gray-500">{toStr(item.date, 'MM. dd HH:mm')}</span>
                                <div className="flex gap-2">
                                    <span className="font-bold">{item.title}</span>
                                    <span className="text-sm text-gray-500">{item.desc}</span>
                                </div>
                                {item.type === SCHE_EVENT_TYPE.B && (
                                    <span className="flex gap-1 items-center text-sm text-gray-500">
                                        {desc}
                                    </span>
                                )}
                                {item.type === SCHE_EVENT_TYPE.L && (
                                    <Link href={item.opt?.url || '#'} target="_blank" className="text-sm text-blue-500">{item.opt?.url}</Link>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {isMobile && (
                <MobileCalendar
                    current={current}
                    viewDate={today}
                    events={data}
                />)
            }
        </>
    )
}