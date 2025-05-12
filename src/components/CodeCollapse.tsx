'use client'

import { useState } from 'react'
import { ReactNode } from 'react'

interface CodeCollapseProps {
  children: ReactNode
  maxVisibleLines?: number
  language?: string // Using _language would make it harder to understand the purpose
}

export default function CodeCollapse({ 
  children, 
  maxVisibleLines = 10,
  language: _language = 'text' // Renamed with underscore to indicate it's unused
}: CodeCollapseProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Extract code content from children
  let codeContent = ''
  if (typeof children === 'string') {
    codeContent = children
  } else if (
    children && 
    typeof children === 'object' && 
    'props' in (children as any) && 
    (children as any).props?.children && 
    typeof (children as any).props?.children === 'string'
  ) {
    codeContent = (children as any).props?.children || ''
  }
  
  const lines = codeContent.split('\n')
  const shouldCollapse = lines.length > maxVisibleLines
  
  // We don't need displayedContent since we just pass children directly
  
  return (
    <div className="relative">
      {children}
      
      {shouldCollapse && (
        <div className="mt-2 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-1 text-sm rounded border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isExpanded ? 'Show Less' : `Show All (${lines.length} lines)`}
          </button>
        </div>
      )}
    </div>
  )
}