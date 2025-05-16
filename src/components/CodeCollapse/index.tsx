// src/components/CodeCollapse/index.tsx
'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

interface CodeCollapseProps {
  children: ReactNode;
  maxVisibleLines?: number;
  language?: string; 
}

export default function CodeCollapse({ 
  children, 
  maxVisibleLines = 10,
  language = 'text' // Keep the actual prop name, and ignore it
}: CodeCollapseProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract code content from children
  let codeContent = '';
  if (typeof children === 'string') {
    codeContent = children;
  } else if (
    children && 
    typeof children === 'object' && 
    'props' in (children as any) && 
    (children as any).props?.children && 
    typeof (children as any).props?.children === 'string'
  ) {
    codeContent = (children as any).props?.children || '';
  }
  
  const lines = codeContent.split('\n');
  const shouldCollapse = lines.length > maxVisibleLines;
   
  const _ = language;
  
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
  );
}