'use client'

import { SCHE_EVENT_TYPE } from '@/constants/schedule';
import { addDate, getDayName, getFirstDateOfWeek, getLastDateOfWeek, toStr } from '@/libs/utils';
import { CalendarProps } from '@/types/View'
import { baseball } from '@lucide/lab';
import { Icon, Plane } from 'lucide-react';
import { ReactNode } from 'react';

export default function MobileCalendar({
    current,
    viewDate,
    events,
}: CalendarProps) {
    const firstDate = getFirstDateOfWeek(current);
    const lastDate = getLastDateOfWeek(current);

    const startDay = firstDate.getDay();
    const lastDay = lastDate.getDay();

    const cells = [];
    for (let i = startDay; i <= lastDay; i++) {
        const date = addDate(firstDate, i);
        cells.push(date);
    }

    const dayColor = (index: number) => {
        const day = index % 7;

        if (day === 0) return 'text-red-400';
        if (day === 6) return 'text-blue-400';

        return 'text-zinc-500'
    }

    return (
        <>
            {cells.map((date, index) => {
                const key = toStr(date, 'yyyy-MM-dd');
                const isToday = date ? toStr(viewDate) === toStr(date) : false
                const data = events ? events[key]?.sort((a, b) => a.date.getTime() - b.date.getTime()) : null;
                return (
                    <div
                        key={key}
                        className="flex flex-col w-full border border-zinc-300 rounded-xl"
                        style={{
                            borderColor: isToday ? 'var(--sub-color)' : '',
                            backgroundColor: isToday ? 'var(--sub-light-color)' : '',
                        }}>
                        <div className={`flex px-3 py-1.5 gap-2 items-baseline`}>
                            <span
                                className={`text-md ${isToday ? 'text-white' : dayColor(index)}`}>{getDayName(date)}</span>
                            <span className="text-lg font-bold">{toStr(date, 'MM. dd')}</span>
                        </div>
                        <div className="flex flex-col justify-center gap-4 p-2 bg-white border-t border-zinc-300 rounded-b-xl min-h-10">
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
                                    <div key={r.id} className="flex gap-2">
                                        <div className={`h-min rounded-xl px-2 text-white`}
                                            style={{
                                                backgroundColor: bgColor
                                            }}>{toStr(r.date, 'HH:mm')}</div>
                                        <div className="flex flex-col">
                                            <div className="truncate" title={r.title}>{r.title}</div>
                                            <div className="flex items-center gap-1 text-zinc-400">{desc}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div >
                )
            })}
        </>
    )
}