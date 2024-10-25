import { Provider } from '@/components/ui/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
