import ScheduleClient from '@/components/schedule/ScheduleClient'
import { CalendarEvents } from '@/types/View'

export const dynamic = 'force-dynamic'

async function getData(): Promise<(CalendarEvents & { _id: string })[]> {
    try {
        const res = await fetch(`${process.env.API_PROTOCOL || 'https://'}${process.env.API_BASE_URL}/api/schedule`, {
            next: { revalidate: 600 }
        });
        console.log(res.url, res.status);
        const { data } = await res.json()

        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.error('Failed to fetch CalendarEvents data:', e);
        return [];
    }
}

export default async function SchedulePage() {
    const data = await getData()
    const events: CalendarEvents[] = data.map((r: CalendarEvents & { _id: string }) => {
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