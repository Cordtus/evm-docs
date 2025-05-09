// In app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { getPageMap } from 'nextra/page-map';
import { Layout } from 'nextra-theme-docs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Cosmos EVM Docs',
  description: 'Documentation for Cosmos EVM',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Layout
          pageMap={await getPageMap()}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}