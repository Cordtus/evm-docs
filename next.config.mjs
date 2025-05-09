// next.config.mjs
import nextra from 'nextra'

const withNextra = nextra({
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  latex: false,
  contentDirPath: 'content',
})

export default withNextra({
  // Next.js config options
  reactStrictMode: true,
  serverExternalPackages: ['shiki'],
  
  nextra: {
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    defaultShowCopyCode: true,
    search: {
      codeblocks: true
    },
    defaultLocale: 'en'
  },
  
  // Configure Turbopack to resolve the mdx-components alias
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx'
    }
  },
  
  // Transpile packages
  transpilePackages: ['nextra-theme-docs'],
  
  // Image optimization configuration
  images: {
    domains: ['cosmos.network'],
  },
  
  // Optional: If you're using the App Router
  experimental: {
    // Any experimental features you want to enable
  },
  
  // Configure compiler options
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // Enable Node.js polyfills for packages that depend on them
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false
    }
    return config
  }
})