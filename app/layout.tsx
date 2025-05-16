// app/layout.tsx

import './globals.css'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Layout } from 'nextra-theme-docs'
import React from 'react';

export const metadata = {
  title: {
    template: '%s | Cosmos EVM Documentation',
    default: 'Cosmos EVM Documentation',
  },
  description: 'Official documentation for Cosmos Ethereum Virtual Machine (EVM)',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Layout pageMap={pageMap}>
          {children}
        </Layout>
      </body>
    </html>
  )
}