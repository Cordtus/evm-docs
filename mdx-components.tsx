// mdx-components.tsx
import { Cards, Callout, Steps, Tabs } from 'nextra/components'
import { useMDXComponents as getDocsThemeComponents } from 'nextra-theme-docs'

// Import custom components
import { ChainInfo, CodeCollapse } from './src/components'

// Type for components parameter
interface MDXComponentsObject {
  [key: string]: React.ComponentType<any> | undefined;
}

export function useMDXComponents(components: MDXComponentsObject = {}) {
  // Get default theme components
  const themeComponents = getDocsThemeComponents()

  return {
    ...themeComponents,
    // Include Nextra components
    Callout,
    Cards,
    Card: Cards.Card,
    Steps,
    Tabs,
    // Add custom components
    ChainInfo,
    CodeCollapse,
    // Merge any components passed from specific pages
    ...components,
  }
}