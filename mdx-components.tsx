// mdx-components.tsx
import { Cards, Callout, Steps, Tabs } from 'nextra/components'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

// Import your custom components
import ChainInfo from './src/components/ChainInfo'
import CodeCollapse from './src/components/CodeCollapse'

export function useMDXComponents(components = {}) {
  return {
    ...getThemeComponents(),
    Callout,
    Cards,
    Steps,
    Tabs,
    // Add Card as an alias for Cards.Card
    Card: Cards.Card,
    ChainInfo,
    CodeCollapse,
    ...components,
  }
}