// next.config.mjs
import nextra from 'nextra'

const withNextra = nextra({})

export default withNextra({
  reactStrictMode: true,
  images: { unoptimized: true },
})