// mdx-components.tsx
import Image from 'next/image';

import { Steps, Cards, Callout, Tabs } from 'nextra/components';
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';

// Import your custom components
import ChainInfo from './src/components/ChainInfo';
import CodeCollapse from './src/components/CodeCollapse';

const themeComponents = getThemeComponents();

export function useMDXComponents(components: Record<string, any> = {}) {
  return {
    ...themeComponents,
    ...components,
    
    // Enhanced wrapper with better error handling
    wrapper: (props: any) => {
      // Defensive destructuring
      const { children, toc, metadata: providedMetadata, ...restProps } = props || {};
      
      // Ensure metadata is properly structured
      const metadata = providedMetadata && typeof providedMetadata === 'object' ? {
        title: providedMetadata.title || '',
        description: providedMetadata.description || '',
        data: (providedMetadata.data && typeof providedMetadata.data === 'object') ? providedMetadata.data : {},
        endpoints: Array.isArray(providedMetadata.endpoints) ? providedMetadata.endpoints : [],
        ...providedMetadata
      } : {
        title: '',
        description: '',
        data: {},
        endpoints: []
      };

      // Ensure data is always an object and endpoints is always an array
      if (!metadata.data || typeof metadata.data !== 'object') {
        metadata.data = {};
      }
      if (!Array.isArray(metadata.endpoints)) {
        metadata.endpoints = [];
      }

      // Call the original wrapper with safe metadata
      const WrapperComponent = themeComponents.wrapper as any;
      
      if (!WrapperComponent) {
        return <div>{children}</div>;
      }
      
      return (
        <WrapperComponent 
          toc={toc || []}
          metadata={metadata}
          {...restProps}
        >
          {children}
        </WrapperComponent>
      );
    },
    
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