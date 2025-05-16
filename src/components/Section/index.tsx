// src/components/Section/index.tsx
'use client'

import React, { ReactNode } from 'react'

interface SectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

export default function Section({ title, icon, children }: SectionProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center mb-5">
        <div className="mr-3 w-5 h-5 bg-gradient-to-br from-neutral-800 to-neutral-900 dark:from-neutral-700 dark:to-neutral-800 rounded-sm shadow-sm flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
      {children}
    </div>
  )
}