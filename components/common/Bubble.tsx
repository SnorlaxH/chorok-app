import { ViewProps } from "@/types/View";

export default function Bubble({ className, children, color }: ViewProps & { color?: string }) {
    const parseBgColor = (color: string) => {
        if (color.startsWith('#')) {
            return `bg-[${color}]`;
        } else if (color.startsWith('--')) {
            return `bg-(${color})`;
        }
        else {
            return `bg-${color}`;
        }
    };

    const parseBorderColor = (color: string) => {
        if(color.startsWith('--')){
            return `var(${color})`;
        }
        return color;
    }

    return (
        <div className={`${className || ""} ${color ? parseBgColor(color) : ""} flex w-fit px-3 py-1 rounded-full text-sm font-bold shadow-xl relative`}>
            <div 
                className={`absolute -bottom-1 -left-1 w-3 h-3 rotate-45 hidden lg:block`}
                style={{
                    width: 0,
                    height: 0,
                    borderTop: `12px solid ${color ? parseBorderColor(color) : "black"}`,
                    borderRight: '12px solid transparent',
                }}/>
            {children}
        </div>
    )
}