import Header from '@/components/layout/Header';
import Nav from '@/components/layout/Nav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row flex-1 items-center justify-center bg-zinc-50 dark:bg-black ">
      <Header />
      <main className="flex flex-1 w-full h-dvh flex-col my-16 lg:my-0 items-center lg:justify-center dark:bg-black">
        {children}
      </main>
      <footer className="w-full h-16 flex justify-center py-2 fixed bottom-0 shadow-(--shadow-top-lg) bg-white lg:hidden">
        <Nav className="flex" />
      </footer>
    </div>
  );
}
