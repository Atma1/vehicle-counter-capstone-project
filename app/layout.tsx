import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
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
        <Navbar />
        <Next13NProgress color="black" height={5} options={{ showSpinner: false }} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

