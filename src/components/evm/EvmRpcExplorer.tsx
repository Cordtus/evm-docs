// File: components/evm/EvmRpcExplorer.tsx
import React, { useState } from 'react'

export function EvmRpcExplorer({ method, exampleRequest, rpcUrl }: {
  method: string
  exampleRequest: any
  rpcUrl: string
}) {
  const [request, setRequest] = useState(JSON.stringify(exampleRequest, null, 2))
  const [response, setResponse] = useState<string>('')

  async function handleSend() {
    try {
      const res = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: request,
      })
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (err) {
      setResponse(`Error: ${(err as Error).message}`)
    }
  }

  return (
    <div className="border rounded-xl p-4 bg-zinc-950 text-sm space-y-4">
      <div className="font-mono text-xs text-zinc-400">{method}</div>
      <textarea
        className="w-full h-40 font-mono bg-black text-white p-2 rounded border"
        value={request}
        onChange={(e) => setRequest(e.target.value)}
      />
      <button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
        Send Request
      </button>
      <pre className="bg-zinc-900 text-green-300 p-3 rounded whitespace-pre overflow-x-auto">
        {response || '// Response will appear here'}
      </pre>
    </div>
  )
}

export default EvmRpcExplorer
