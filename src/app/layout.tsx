import type { Metadata } from 'next';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub - Manage Your Notes',
  description: 'A simple and efficient application designed for managing personal notes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          {/* Додаємо suppressHydrationWarning сюди */}
          <div id="root-layout" suppressHydrationWarning>
            {children}
          </div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
