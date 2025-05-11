// next.config.mjs
import path from 'node:path'

import nextra from 'nextra'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

import remarkEnsureData from './remark-ensure-data.mjs'

const withNextra = nextra({
  latex: { renderer: 'katex' },
  search: { codeblocks: false },
  mdxOptions: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontMatter' }],
      remarkEnsureData,
    ],
  },
})

export default withNextra({
  reactStrictMode: true,
  images: { unoptimized: true },

  webpack(cfg) {
    cfg.module.rules.push({ test: /\.go$/, use: 'ignore-loader' })

    // Apply patch to ALL nextra-theme-docs files, not just specific ones
    cfg.module.rules.push({
      enforce: 'pre',
      test: /[\\/]nextra-theme-docs[\\/].*\.js$/,
      loader: path.resolve(process.cwd(), 'patch-frontmatter-loader.mjs'),
    })
    
    // Also patch any chunk files that might contain the problematic code
    cfg.module.rules.push({
      enforce: 'pre',
      test: /[\\/]\.next[\\/]server[\\/]chunks[\\/].*\.js$/,
      loader: path.resolve(process.cwd(), 'patch-frontmatter-loader.mjs'),
    })
    
    return cfg
  },
})