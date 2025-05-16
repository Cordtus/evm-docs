// src/components/NetworkInfo/index.tsx
'use client'

import React, { useState } from 'react'

interface NetworkInfoProps {
  networks?: {
    name: string
    chainId: string
    rpcUrl: string
    explorerUrl: string
  }[]
}

export default function NetworkInfo({ networks = [] }: NetworkInfoProps) {
  const [activeTab, setActiveTab] = useState(0)
  
  const defaultNetworks = [
    {
      name: 'Mainnet',
      chainId: '777',
      rpcUrl: 'https://evm-rpc.cosmos.network',
      explorerUrl: 'https://explorer.cosmos.network'
    },
    {
      name: 'Testnet',
      chainId: '123',
      rpcUrl: 'https://testnet-evm-rpc.cosmos.network',
      explorerUrl: 'https://testnet-explorer.cosmos.network'
    }
  ]
  
  const displayNetworks = networks.length > 0 ? networks : defaultNetworks
  
  return (
    <div className="p-6 mb-10 rounded-xl bg-neutral-900/5 dark:bg-neutral-900/20 border border-neutral-200/50 dark:border-neutral-800 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="mr-3 w-5 h-5 bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-800 dark:to-neutral-900 rounded-sm shadow-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-neutral-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="18" y="3" width="4" height="18"></rect>
            <rect x="10" y="8" width="4" height="13"></rect>
            <rect x="2" y="13" width="4" height="8"></rect>
          </svg>
        </div>
        <h2 className="text-xl font-medium text-neutral-800 dark:text-white">Network Information</h2>
      </div>
      
      <div className="flex mb-4 border-b border-neutral-200 dark:border-neutral-800">
        {displayNetworks.map((network, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index 
                ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400' 
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {network.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/5 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Chain ID</span>
          <code className="px-2 py-1 rounded bg-neutral-900/10 dark:bg-neutral-900/50 text-sm text-orange-600 dark:text-orange-400 font-mono">
            {displayNetworks[activeTab].chainId}
          </code>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/5 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">RPC URL</span>
          <code className="px-2 py-1 rounded bg-neutral-900/10 dark:bg-neutral-900/50 text-sm text-orange-600 dark:text-orange-400 font-mono truncate max-w-[200px]">
            {displayNetworks[activeTab].rpcUrl}
          </code>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/5 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 md:col-span-2">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Block Explorer</span>
          <a 
            href={displayNetworks[activeTab].explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 rounded bg-neutral-900/10 dark:bg-neutral-900/50 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-mono flex items-center"
          >
            {displayNetworks[activeTab].explorerUrl}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}