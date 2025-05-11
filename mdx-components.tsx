// mdx-components.tsx
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import { Steps, Cards, Callout, Tabs } from 'nextra/components';
import Image from 'next/image';

// Import your custom components
import ChainInfo from './src/components/ChainInfo';
import CodeCollapse from './src/components/CodeCollapse';

const themeComponents = getThemeComponents();

export function useMDXComponents(components = {}) {
  return {
    ...themeComponents,
    ...components,
    
    // Nextra components
    Steps,
    Cards,
    Callout,
    Tabs,
    Image,
    
    // Custom components
    ChainInfo,
    CodeCollapse,
  };
}