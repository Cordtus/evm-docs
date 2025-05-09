'use client'

import { useState, useEffect } from 'react'

interface ChainInfoProps {
  chain: string
  endpoint?: string
}

interface ChainData {
  blockNumber: number
  chainId: string
}

export default function ChainInfo({ chain, endpoint }: ChainInfoProps) {
  const [data, setData] = useState<ChainData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChainData = async () => {
      try {
        setLoading(true)
        
        // Default endpoints for known chains
        const endpoints: Record<string, string> = {
          'cosmos-evm': 'https://evm-rpc.cosmos.network',
          // Add more default endpoints as needed
        }
        
        const rpcUrl = endpoint || endpoints[chain] || '';
        if (!rpcUrl) {
          throw new Error('No RPC URL provided or known for this chain')
        }
        
        // Make RPC calls to get basic chain info
        const [blockNumberRes, chainIdRes] = await Promise.all([
          fetch(rpcUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_blockNumber',
              params: [],
              id: 1
            })
          }).then(res => res.json()),
          
          fetch(rpcUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_chainId',
              params: [],
              id: 2
            })
          }).then(res => res.json())
        ])
        
        if (blockNumberRes.error || chainIdRes.error) {
          throw new Error(blockNumberRes.error?.message || chainIdRes.error?.message || 'RPC call failed')
        }
        
        setData({
          blockNumber: parseInt(blockNumberRes.result, 16),
          chainId: parseInt(chainIdRes.result, 16).toString()
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchChainData()
    
    // Set up polling to refresh data
    const intervalId = setInterval(fetchChainData, 15000) // every 15 seconds
    
    return () => clearInterval(intervalId)
  }, [chain, endpoint])
  
  if (loading) {
    return (
      <div className="animate-pulse p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-900/20">
        <h3 className="text-red-800 dark:text-red-300 font-medium mb-1">Error loading chain data</h3>
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      </div>
    )
  }
  
  if (!data) {
    return null
  }
  
  return (
    <div className="p-4 border border-orange-200 dark:border-orange-900/50 rounded-lg bg-orange-50 dark:bg-orange-900/20 mb-6">
      <h3 className="text-orange-800 dark:text-orange-300 font-medium mb-3">{chain} Network Status</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-gray-600 dark:text-gray-400">Chain ID:</div>
        <div className="font-mono">{data.chainId}</div>
        <div className="text-gray-600 dark:text-gray-400">Current Block:</div>
        <div className="font-mono">{data.blockNumber.toLocaleString()}</div>
      </div>
    </div>
  )
}