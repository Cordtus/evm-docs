'use client'

import { useState, useEffect } from 'react'

export default function ChainInfo() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (loading) {
    return (
      <div className="border rounded p-4">
        <p>Loading chain information...</p>
      </div>
    )
  }

  return (
    <div className="border rounded p-4">
      <h3 className="text-lg font-bold mb-2">Network Status</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-gray-500">Latest Block</div>
          <div className="font-medium">12,345,678</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Last Updated</div>
          <div className="font-medium">{new Date().toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Chain ID</div>
          <div className="font-medium">cosmos-evm-777</div>
        </div>
      </div>
    </div>
  )
}