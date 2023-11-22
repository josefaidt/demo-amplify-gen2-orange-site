import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AmplifyConfigure } from '@/components/amplify-configure'
import { MainNav } from '@/components/main-nav'
import cn from 'clsx'
import './globals.css'
import Content from '@/components/content'

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
        <AmplifyConfigure>
          <div
            className={cn(
              'flex flex-col min-h-screen',
              'max-w-6xl mx-auto',
              'py-4',
              'text-base',
              inter.className,
            )}
          >
            <MainNav />
            <Content>{children}</Content>
          </div>
        </AmplifyConfigure>
      </body>
    </html>
  )
}
