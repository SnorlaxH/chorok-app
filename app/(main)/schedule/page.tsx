import ScheduleClient from '@/components/schedule/ScheduleClient'
import { CalendarEvents } from '@/types/View'

export const maxDuration = 60;

async function getData(): Promise<(CalendarEvents & { _id: string })[]> {
    const apiBaseUrl = process.env.API_BASE_URL;

    if (!apiBaseUrl) {
        throw new Error('API_BASE_URL 환경 변수가 설정되지 않았습니다.');
    }

    const url = new URL('/api/schedule', apiBaseUrl);

    console.log('[schedule] upstream request:', url.toString());

    try {
        const res = await fetch(url, {
            next: { revalidate: 600 },
            headers: {
                Accept: 'application/json',
            },
        });

        console.log('[schedule] upstream response:', res.status);

        if (!res.ok) {
            throw new Error(`외부 API 응답 오류: ${res.status} ${res.statusText}`);
        }

        const { data } = await res.json();

        return Array.isArray(data) ? data : [];
    } catch (error) {
        const cause =
            error instanceof Error && 'cause' in error
                ? error.cause
                : undefined;

        console.error('[schedule] upstream fetch failed:', {
            url: url.toString(),
            error,
            cause,
        });

        throw error;
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