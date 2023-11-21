import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AmplifyConfigure } from '@/components/amplify-configure'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orange Site',
  description: 'Welcome to the orange site demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AmplifyConfigure>{children}</AmplifyConfigure>
      </body>
    </html>
  )
}
