// mdx-components.tsx
import { Steps, Tabs } from 'nextra/components';
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';

// Import custom components
import { 
  Card, 
  Header,
  Section, 
  NetworkInfo,
  CodeCollapse, 
  EVMRPCExplorer
} from './src/components';

export function useMDXComponents(components = {}) {
  return {
    ...getThemeComponents(),
    // Custom components
    Card,
    Header,
    Section,
    NetworkInfo,
    CodeCollapse, 
    EVMRPCExplorer,
    // Nextra components
    Steps,
    Tabs,
    ...components
  };
}