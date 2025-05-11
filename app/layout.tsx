// app/layout.tsx
import './globals.css'
import { getPageMap } from 'nextra/page-map'
import { Layout } from 'nextra-theme-docs'

export const metadata = {
  title: 'Cosmos EVM Documentation',
  description: 'Documentation for Cosmos EVM',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()
  
  return (
    <html lang="en">
      <body>
        <Layout pageMap={pageMap}>
          {children}
        </Layout>
      </body>
    </html>
  )
}