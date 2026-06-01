'use client'
import React from 'react'
import { Icon, Plane } from 'lucide-react';
import { baseball } from '@lucide/lab';

import { SCHE_EVENT_TYPE } from '@/constants/schedule';
import { getFirstDateOfMonth, getLastDateOfMonth, toStr } from '@/libs/utils'
import { CalendarEvents, CalendarProps } from '@/types/View'
import { ReactNode } from 'react';

export default function Calendar({
    className,
    current,
    viewDate,
    events,
    onClick,
}: CalendarProps) {
    const firstDate = getFirstDateOfMonth(current);
    const lastDate = getLastDateOfMonth(current);

    const startDay = firstDate.getDay();
    const lastDay = lastDate.getDate();

    const cells = Array.from(
        { length: startDay + lastDay },
        (_, i) => {
            const day = i - startDay + 1;

            if (day < 1) return null
            return new Date(current.getFullYear(), current.getMonth(), day);
        },
    );

    while (cells.length % 7 !== 0) {
        cells.push(null);
    }


    const dayColor = (index: number) => {
        const day = index % 7;

        if (day === 0) return 'text-red-400';
        if (day === 6) return 'text-blue-400';

        return ''
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, item: CalendarEvents[] | null) => {
        e.stopPropagation();

        onClick?.(item)
    }

    return (
        <>
            <div className={`w-full h-full grid grid-cols-7 gap-2 ${className}`}>
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => {
                    return (
                        <div
                            key={day}
                            className={`h-fit text-center rounded-xl border border-zinc-100 bg-white px-4 py-2 ${dayColor(index)}`}>
                            {day}
                        </div>
                    )
                })}

                {cells.map((date, index) => {
                    const key = date ? toStr(date, 'yyyy-MM-dd') : `empty-${index}`
                    const isToday = date ? toStr(viewDate) === toStr(date) : false
                    const data = events ? events[key]?.sort((a, b) => a.date.getTime() - b.date.getTime()) : null
                    return (
                        <div
                            key={key}
                            className={`min-h-36 text-left rounded-xl px-4 py-2 transition-colors duration-300 ${date ? `border border-zinc-100 bg-white hover:bg-[rgba(0,0,0,0.1)] ` : ''}`}
                            style={{
                                borderColor: isToday ? `var(--sub-color)` : '',
                                borderWidth: isToday ? '2px' : '',
                            }}
                            onClick={(e) => date && handleClick(e, data)}
                        >{date && (
                            <>
                                <div
                                    className={`flex flex-col h-full text-sm font-bold ${dayColor(index)}`}>
                                    {date.getDate()}
                                    <div className="py-2 flex flex-col h-full gap-2">
                                        {data?.map(r => {
                                            let bgColor = 'var(--main-deep-color)'
                                            let desc: ReactNode;
                                            if (r.type === SCHE_EVENT_TYPE.B) {
                                                const isHome = r.opt?.isHome;
                                                const size = 20;
                                                desc = (
                                                    <>
                                                        {isHome ? <Icon className="text-(--sub-color)" size={size} iconNode={baseball} /> : <Plane className="text-(--sub-color)" size={size} />}
                                                        {isHome ? '홈' : '원정'}
                                                    </>
                                                );
                                            }
                                            else if (r.type === SCHE_EVENT_TYPE.L) {
                                                bgColor = 'var(--point-color)'
                                            }
                                            return (
                                                <div
                                                    key={r.id}
                                                    className="schedule-event flex flex-col gap-1 text-black"
                                                >
                                                    <div className="flex gap-2">
                                                        <div className={`h-min rounded-xl px-2 text-white`}
                                                            style={{
                                                                backgroundColor: bgColor
                                                            }}>{toStr(r.date, 'HH:mm')}</div>
                                                        <div className="truncate" title={r.title}>{r.title}</div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-zinc-400">{desc}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}