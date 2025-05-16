// src/components/SidebarToggle/index.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useConfig } from 'nextra-theme-docs'

export function SidebarToggle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const config = useConfig()
  
  useEffect(() => {
    // Check for sidebar visibility from local storage
    const storedValue = localStorage.getItem('nextra-sidebar')
    if (storedValue) {
      setIsSidebarOpen(storedValue === 'true')
    }
    
    // Create event listener for sidebar changes
    const handleSidebarChange = () => {
      const newValue = localStorage.getItem('nextra-sidebar')
      setIsSidebarOpen(newValue === 'true')
    }
    
    window.addEventListener('storage', handleSidebarChange)
    
    return () => {
      window.removeEventListener('storage', handleSidebarChange)
    }
  }, [])
  
  const toggleSidebar = () => {
    const newValue = !isSidebarOpen
    localStorage.setItem('nextra-sidebar', String(newValue))
    setIsSidebarOpen(newValue)
    // Dispatch event to trigger Nextra sidebar toggle
    window.dispatchEvent(new Event('storage'))
    
    // If there's a sidebar toggle function in the config, use it
    if (config.sidebar?.toggleSidebar) {
      config.sidebar.toggleSidebar()
    }
  }
  
  if (isSidebarOpen) return null
  
  return (
    <button
      onClick={toggleSidebar}
      className="fixed left-4 top-[70px] z-30 flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-400"
      aria-label="Toggle Sidebar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M9 3v18" />
      </svg>
    </button>
  )
}