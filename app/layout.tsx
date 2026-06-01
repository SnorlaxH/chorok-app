import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '💚타쵸쵸💚',
  description: '타쵸쵸 팬페이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
