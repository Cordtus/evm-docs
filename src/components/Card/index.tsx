// src/components/Card/index.tsx
'use client'

import Link from 'next/link'
import React, { ReactNode } from 'react'

export type CardVariant = 'feature' | 'resource' | 'link'

interface CardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  variant?: CardVariant
  links?: Array<{
    title: string
    href: string
  }>
  children?: ReactNode
}

export default function Card({ 
  title, 
  description, 
  icon, 
  href, 
  variant = 'link',
  links,
  children
}: CardProps) {
  // Base classes all cards share
  const baseClasses = "rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
  
  // Variant-specific styling
  if (variant === 'feature') {
    return (
      <Link 
        href={href}
        className={`${baseClasses} group flex items-start justify-between p-6 bg-neutral-900/5 dark:bg-neutral-900/20 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
        <div className="flex items-start gap-5 z-10">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/60 to-orange-700/70 flex items-center justify-center shadow-md">
            {icon}
          </div>
          <div className="max-w-2xl">
            <h3 className="text-lg md:text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">{title}</h3>
            <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-4">{description}</p>
            
            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="px-3 py-1.5 text-neutral-800 dark:text-neutral-200 bg-neutral-900/5 dark:bg-neutral-900/20 border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-lg backdrop-blur-sm transition-all flex items-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/70 mr-2"></div>
                    <span className="text-sm font-medium">{link.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-neutral-400 ml-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
            
            {children}
          </div>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800/50 dark:bg-neutral-800/70 backdrop-blur-sm group-hover:bg-neutral-700/80 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </Link>
    )
  }
  
  if (variant === 'resource') {
    return (
      <Link 
        href={href}
        className={`${baseClasses} group flex items-start p-5 bg-neutral-900/5 dark:bg-neutral-900/20 no-underline hover:shadow-md`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-900/10 dark:bg-neutral-800/30 mr-4 group-hover:bg-neutral-800 group-hover:text-white transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-medium mb-1 text-neutral-800 dark:text-neutral-200">{title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
          {children}
        </div>
      </Link>
    )
  }
  
  // Default 'link' variant
  return (
    <Link 
      href={href}
      className={`${baseClasses} group flex items-center justify-between p-6 bg-neutral-900/5 dark:bg-neutral-900/20`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
          {children}
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </Link>
  )
}