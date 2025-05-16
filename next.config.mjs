// next.config.mjs
import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  staticImage: true,
  contentDirBasePath: '/content'
})

export default withNextra({
  images: { unoptimized: true },
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx'
    }
  }
})