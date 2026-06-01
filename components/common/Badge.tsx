import { ViewProps } from '@/types/View';

export default function Badge({ className, children, color, onClick }: ViewProps & { color?: string, onClick?: () => void }) {
    const parseColor = (color: string) => {
        if (color.startsWith('--')) {
            return `var(${color})`;
        }
        else {
            return `${color}`;
        }
    };

    return (
        <div
            className={`px-3 py-1 rounded-full text-white text-xs font-bold ${className || ''}`}
            style={{
                backgroundColor: `${color ? parseColor(color) : ''}`
            }}
            onClick={onClick}>
            {children}
        </div>
    )
}