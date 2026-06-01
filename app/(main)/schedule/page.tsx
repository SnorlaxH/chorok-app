import ScheduleClient from '@/components/schedule/ScheduleClient'
import { CalendarEvents } from '@/types/View'

async function getEvents() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/schedule`)
    return res.json()
}

export default async function SchdeuldePage() {
    const res = await getEvents()
    const events: CalendarEvents[] = res.data.map((r: CalendarEvents & { _id: string }) => {
        const date = new Date(r.date);
        return {
            ...r,
            id: r._id,
            date,
        }
    }) ?? []

    return (
        <div className="h-full flex flex-col px-4 py-2 gap-2 overflow-y-auto relative">
            <ScheduleClient events={events} />
        </div>
    )
}