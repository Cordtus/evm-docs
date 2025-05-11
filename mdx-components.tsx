// mdx-components.tsx
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import { Steps } from 'nextra/components';

import ChainInfo from './src/components/ChainInfo';
import CodeCollapse from './src/components/CodeCollapse';


const themeComponents = getThemeComponents();

export function useMDXComponents(components = {}) {
  return {
    ...themeComponents,
    ...components,
    
    // Custom components
    ChainInfo,
    CodeCollapse,
    Steps,
  };
}