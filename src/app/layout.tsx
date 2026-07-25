import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Red Planet Portal | Autonomous Digital Media Empire',
  description: 'The ultimate command center—a Tesla-grade, hyper-immersive autonomous digital ecosystem',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark-bg text-white">{children}</body>
    </html>
  )
}
