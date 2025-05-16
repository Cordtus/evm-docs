// src/components/evm/EvmRpcExplorer/index.tsx
'use client'

import { useState } from 'react'

// Define proper types instead of 'any'
interface RpcResponse<T> {
  id: number;
  jsonrpc: string;
  result: T;
  error?: {
    code: number;
    message: string;
  };
}

interface RpcMethod {
  name: string;
  description: string;
  params: {
    name: string;
    type: string;
    description: string;
  }[];
}

// Define props with proper types
interface EVMRPCExplorerProps {
  endpoint?: string;
  defaultMethod?: string;
}

export default function EVMRPCExplorer({ 
  endpoint = "https://evm-rpc.cosmos.network", 
  defaultMethod = "eth_blockNumber" 
}: EVMRPCExplorerProps) {
  const [method, setMethod] = useState(defaultMethod);
  const [params, setParams] = useState("[]");
  const [result, setResult] = useState<string>("");
  
  // Define available methods
  const methods: RpcMethod[] = [
    {
      name: "eth_blockNumber",
      description: "Returns the current block number",
      params: []
    },
    {
      name: "eth_chainId",
      description: "Returns the current chain ID",
      params: []
    },
    {
      name: "eth_getBalance",
      description: "Returns the balance of an address",
      params: [
        { name: "address", type: "string", description: "Ethereum address" },
        { name: "blockNumber", type: "string", description: "Block number or tag" }
      ]
    }
  ];
  
  const executeQuery = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method,
          params: JSON.parse(params)
        })
      });
      
      const data: RpcResponse<unknown> = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setResult(`Error: ${error.message}`);
      } else {
        setResult("An unknown error occurred");
      }
    }
  };
  
  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
      <h3 className="text-lg font-medium mb-4">EVM RPC Explorer</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Method</label>
        <select 
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          {methods.map((m) => (
            <option key={m.name} value={m.name}>{m.name}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Parameters (JSON array)</label>
        <textarea
          className="w-full p-2 border rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-700"
          value={params}
          onChange={(e) => setParams(e.target.value)}
          rows={3}
        />
      </div>
      
      <button 
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mb-4"
        onClick={executeQuery}
      >
        Execute
      </button>
      
      {result && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Result:</h4>
          <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded overflow-auto font-mono text-sm">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}