// app/layout.tsx
import React from 'react';
import { getPageMap } from 'nextra/page-map';
import { Layout } from 'nextra-theme-docs';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Layout
          pageMap={pageMap}
          navbar={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                <span className="text-white font-bold">⚡</span>
              </div>
              <span className="font-bold text-xl">Cosmos EVM</span>
            </div>
          }
          sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: true
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}