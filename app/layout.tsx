import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Next13NProgress } from 'nextjs13-progress';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vehicle Counter',
  description: 'Automated Traffic Monitoring System with Deep Learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Next13NProgress color="black" height={5} options={{ showSpinner: false }} />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

