import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as getNextraComponents } from 'nextra/mdx-components'
import dynamic from 'next/dynamic'

// Dynamically import client components to avoid SSR issues
const ChainInfo = dynamic(() => import('./src/components/ChainInfo'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse h-24 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
  )
})

const CodeCollapse = dynamic(() => import('./src/components/CodeCollapse'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse h-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
  )
})

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...getNextraComponents({}),
    ...components,
    
    // Custom components
    ChainInfo,
    CodeCollapse,
    
    // Override default elements if needed
    table: props => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse" {...props} />
      </div>
    ),
    
    // Add link styling
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http')
      return (
        <a 
          href={href}
          {...props}
          className="cosmic-link"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
          {isExternal && (
            <span className="ml-1 inline-block align-text-bottom">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          )}
        </a>
      )
    }
  }
}