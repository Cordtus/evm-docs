// src/components/Header/index.tsx
'use client'

import Image from 'next/image'
import React from 'react'

interface HeaderProps {
  title: string
  description: string
  image?: string
}

export default function Header({ title, description, image }: HeaderProps) {
  return (
    <div className="flex flex-col items-center w-full mb-12">
      <div className="flex flex-col items-center mb-6">
        {image && (
          <div className="mb-6">
            <Image 
              src={image} 
              alt={title} 
              width={400} 
              height={200} 
              priority 
              className="max-w-[400px] bg-transparent" 
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
      </div>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 text-center max-w-2xl mb-6">
        {description}
      </p>
    </div>
  )
}