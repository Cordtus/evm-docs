// next.config.mjs
import nextra from 'nextra'

// Nextra v4 configuration
const withNextra = nextra({
  // These options are confirmed to work with Nextra v4
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  latex: false,
  defaultShowCopyCode: true,
  search: {
    codeblocks: true
  },
})

export default withNextra({
  // Next.js config options
  reactStrictMode: true,
  serverExternalPackages: ['shiki'],
  
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
    formats: ['image/avif', 'image/webp'],
  },
  
  // Configure compiler options
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn', 'info']
    } : false,
  },
  
  // Enhanced webpack configuration with Go file handling
  webpack: (config, { _isServer }) => {
    // Handle binary and non-web file types
    config.module.rules.push({
      test: /\.(go|mod|sum|proto|java|rs|py|c|cpp|h|hpp|zip|pdf|doc|docx|xls|xlsx)$/,
      use: 'ignore-loader',
    });
    
    // Node.js polyfills
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    
    return config;
  },
  
  poweredByHeader: false,
  
  // Security headers
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache static assets
        source: '/(.*).(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
})