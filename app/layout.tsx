// app/layout.tsx
import './globals.css'
import { Metadata } from 'next'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'

export const metadata: Metadata = {
  title: {
    template: '%s | Cosmos EVM Documentation',
    default: 'Cosmos EVM Documentation',
  },
  description: 'Official documentation for Cosmos Ethereum Virtual Machine (EVM)',
  openGraph: {
    title: 'Cosmos EVM Documentation',
    description: 'Official documentation for Cosmos Ethereum Virtual Machine (EVM)',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmos EVM Documentation',
    description: 'Official documentation for Cosmos Ethereum Virtual Machine (EVM)',
  },
}

// Define navbar component 
const navbar = (
  <Navbar
    logo={(
      <div className="flex items-center">
        <span className="font-bold text-xl mr-2">Cosmos EVM</span>
        <span className="text-orange-500">Docs</span>
      </div>
    )}
  />
)

// Define footer component
const footer = (
  <Footer>
    <div className="flex w-full justify-between items-center">
      <div>
        <a
          className="flex items-center gap-1 text-current"
          target="_blank"
          rel="noopener noreferrer"
          href="https://cosmos.network"
        >
          <span>Powered by Cosmos</span>
        </a>
      </div>
      <div className="text-sm">
        © {new Date().getFullYear()} Cosmos Network
      </div>
    </div>
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()
  
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="cosmic-bg">
        <Layout
          pageMap={pageMap}
          navbar={navbar}
          footer={footer}
          docsRepositoryBase="https://github.com/cosmos/cosmos-sdk/tree/main/docs"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}