'use client'

import { useState } from 'react'
import { ReactNode } from 'react'

interface CodeCollapseProps {
  children: ReactNode
  maxVisibleLines?: number
  language?: string
}

type CodeComponentProps = {
  children?: string
  props?: {
    children?: string
  }
}

export default function CodeCollapse({ 
  children, 
  maxVisibleLines = 10,
  language = 'text'
}: CodeCollapseProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Extract code content from children
  let codeContent = ''
  if (typeof children === 'string') {
    codeContent = children
  } else if (
    children && 
    typeof children === 'object' && 
    'props' in (children as CodeComponentProps) && 
    (children as CodeComponentProps).props?.children && 
    typeof (children as CodeComponentProps).props?.children === 'string'
  ) {
    codeContent = (children as CodeComponentProps).props?.children
  }
  
  const lines = codeContent.split('\n')
  const shouldCollapse = lines.length > maxVisibleLines
  const displayedContent = isExpanded 
    ? codeContent 
    : lines.slice(0, maxVisibleLines).join('\n')
  
  return (
    <div className="relative">
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>
          {displayedContent}
          {shouldCollapse && !isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 dark:from-gray-900 pointer-events-none"></div>
          )}
        </code>
      </pre>
      
      {shouldCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium"
        >
          {isExpanded ? 'Show Less' : `Show All (${lines.length} lines)`}
        </button>
      )}
    </div>
  )
}