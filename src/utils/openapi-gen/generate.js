// src/utils/openapi-gen/generate.js
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

const ETH_METHODS = [
  {
    method: 'eth_blockNumber',
    params: [],
    result: { type: 'string', description: 'Hexadecimal block number' },
  },
  {
    method: 'eth_getTransactionByHash',
    params: [
      {
        type: 'string',
        description: '32-byte transaction hash',
      },
    ],
    result: {
      type: 'object',
      additionalProperties: true,
      description: 'Transaction object or null',
    },
  },
];

async function generate() {
  const basePath = './public/openapi/components';
  await fs.mkdir(basePath, { recursive: true });

  const eth = {
    paths: {
      '/': {
        post: {
          summary: 'Ethereum JSON-RPC API (eth namespace)',
          description: 'Handles EVM JSON-RPC methods prefixed with `eth_`.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  oneOf: ETH_METHODS.map((m) => ({
                    $ref: `#/components/schemas/${m.method}Request`,
                  })),
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    oneOf: ETH_METHODS.map((m) => ({
                      $ref: `#/components/schemas/${m.method}Response`,
                    })),
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {},
    },
  };

  for (const method of ETH_METHODS) {
    eth.components.schemas[`${method.method}Request`] = {
      type: 'object',
      required: ['jsonrpc', 'method', 'params', 'id'],
      properties: {
        jsonrpc: { type: 'string', example: '2.0' },
        method: { type: 'string', enum: [method.method] },
        params: { type: 'array', items: method.params, minItems: method.params.length, maxItems: method.params.length },
        id: { type: 'integer', example: 1 },
      },
    };
    eth.components.schemas[`${method.method}Response`] = {
      type: 'object',
      required: ['jsonrpc', 'id'],
      properties: {
        jsonrpc: { type: 'string', example: '2.0' },
        id: { type: 'integer' },
        result: method.result,
      },
    };
  }

  const yamlStr = yaml.dump(eth);
  await fs.writeFile(path.join(basePath, 'eth.yaml'), yamlStr, 'utf8');

  const fullJson = {
    openapi: '3.1.0',
    info: { title: 'EVM JSON-RPC API', version: '1.0.0' },
    ...eth,
  };
  await fs.writeFile('./public/openapi/evm-openapi.json', JSON.stringify(fullJson, null, 2));
  console.log('✅ OpenAPI files generated');
}

generate().catch(console.error);
