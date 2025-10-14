import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "FraudGuard ML Pipeline",
  description: "End-to-end ML pipeline for fraud detection",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="flex h-screen overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
