// next.config.mjs
import nextra from 'nextra'

const withNextra = nextra({
  latex: { renderer: 'katex' },
  search: {
    codeblocks: false
  },
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        light: 'github-light-default',
        dark: 'github-dark-default'
      }
    }
  }
})

export default withNextra({
  reactStrictMode: true,
  
  images: {
    unoptimized: true
  },
  
  webpack: (config) => {
    // Ignore .go files
    config.module.rules.push({
      test: /\.go$/,
      use: 'ignore-loader',
    })
    
    return config
  },
})