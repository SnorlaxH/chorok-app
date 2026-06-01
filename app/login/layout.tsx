export default function LoginLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col lg:flex-row flex-1 items-center justify-center bg-zinc-50 dark:bg-black ">
            {children}
        </div>
    )
}