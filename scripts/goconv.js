#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse Go file and extract interface methods
function parseGoInterface(content) {
  const methods = [];
  
  // Find interface definitions
  const interfaceRegex = /type\s+(\w+)\s+interface\s*{([^}]+)}/gs;
  const matches = [...content.matchAll(interfaceRegex)];
  
  for (const match of matches) {
    const interfaceName = match[1];
    const interfaceBody = match[2];
    
    // Extract methods from interface
    const methodRegex = /\/\/([^\/\n]*(?:\n\s*\/\/[^\/\n]*)*)?([^\/\n]*)\n\s*(\w+)\s*\((.*?)\)\s*(\([^)]*\)|[\w\.\[\]\*]*)/g;
    const methodMatches = [...interfaceBody.matchAll(methodRegex)];
    
    for (const methodMatch of methodMatches) {
      const comments = methodMatch[1]?.trim().replace(/^\/\//gm, '').trim() || '';
      const methodName = methodMatch[3];
      const params = methodMatch[4];
      const returns = methodMatch[5];
      
      // Parse parameters
      const paramList = params.split(',').map(p => p.trim()).filter(Boolean);
      const parsedParams = paramList.map(param => {
        const parts = param.trim().split(/\s+/);
        if (parts.length >= 2) {
          return {
            name: parts[0],
            type: parts.slice(1).join(' ')
          };
        }
        return { name: '', type: param };
      });
      
      methods.push({
        interface: interfaceName,
        name: methodName,
        description: comments,
        parameters: parsedParams,
        returns: returns.trim()
      });
    }
  }
  
  return methods;
}

// Parse actual method implementations
function parseGoImplementations(content) {
  const implementations = [];
  const methodRegex = /func\s*\(\s*[\w\s]*\*?(\w+)\s*\)\s*(\w+)\s*\((.*?)\)\s*(\([^)]*\)|[\w\.\[\]\*]*)\s*{/g;
  const matches = [...content.matchAll(methodRegex)];
  
  for (const match of matches) {
    const receiver = match[1];
    const methodName = match[2];
    const params = match[3];
    const returns = match[4];
    
    // Find comments above the method
    const methodStart = match.index;
    const precedingText = content.substring(Math.max(0, methodStart - 500), methodStart);
    const commentRegex = /\/\/\s*([^\n]+)(?:\n\s*\/\/\s*([^\n]+))*/g;
    const commentLines = [];
    let commentMatch;
    
    while ((commentMatch = commentRegex.exec(precedingText)) !== null) {
      commentLines.push(commentMatch[0].replace(/^\/\/\s*/gm, '').trim());
    }
    
    const description = commentLines.pop() || '';
    
    // Parse parameters
    const paramList = params.split(',').map(p => p.trim()).filter(Boolean);
    const parsedParams = paramList.map(param => {
      const parts = param.trim().split(/\s+/);
      if (parts.length >= 2) {
        return {
          name: parts[0],
          type: parts.slice(1).join(' ')
        };
      }
      return { name: '', type: param };
    });
    
    implementations.push({
      receiver,
      name: methodName,
      description,
      parameters: parsedParams,
      returns: returns.trim()
    });
  }
  
  return implementations;
}

// Parse type definitions
function parseGoTypes(content) {
  const types = {};
  
  // Find struct definitions
  const structRegex = /type\s+(\w+)\s+struct\s*{([^}]+)}/gs;
  const matches = [...content.matchAll(structRegex)];
  
  for (const match of matches) {
    const typeName = match[1];
    const structBody = match[2];
    
    // Parse struct fields
    const fieldRegex = /(\w+)\s+([\w\.\[\]\*]+)(?:\s+`([^`]+)`)?/g;
    const fields = [];
    let fieldMatch;
    
    while ((fieldMatch = fieldRegex.exec(structBody)) !== null) {
      fields.push({
        name: fieldMatch[1],
        type: fieldMatch[2],
        tag: fieldMatch[3] || ''
      });
    }
    
    types[typeName] = {
      name: typeName,
      fields
    };
  }
  
  return types;
}

// Process all Go files in a directory
function processGoFiles(sourceDir) {
  const rpcData = {
    namespaces: {},
    types: {},
    interfaces: {}
  };
  
  function processDirectory(dir, namespace = '') {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath, file);
      } else if (file.endsWith('.go')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract package name
        const packageMatch = content.match(/package\s+(\w+)/);
        const packageName = packageMatch ? packageMatch[1] : namespace;
        
        // Initialize namespace if it doesn't exist
        if (!rpcData.namespaces[packageName]) {
          rpcData.namespaces[packageName] = {
            interfaces: [],
            implementations: [],
            types: {}
          };
        }
        
        // Parse interfaces, implementations, and types
        const interfaces = parseGoInterface(content);
        const implementations = parseGoImplementations(content);
        const types = parseGoTypes(content);
        
        // Add to namespace
        rpcData.namespaces[packageName].interfaces.push(...interfaces);
        rpcData.namespaces[packageName].implementations.push(...implementations);
        Object.assign(rpcData.namespaces[packageName].types, types);
        
        // Add to global types
        Object.assign(rpcData.types, types);
      }
    }
  }
  
  processDirectory(sourceDir);
  return rpcData;
}

// Main execution
if (require.main === module) {
  const sourceDir = process.argv[2] || './content/api';
  const outputFile = process.argv[3] || './public/rpc-methods.json';
  
  console.info('Converting Go files to RPC method documentation...');
  console.info(`Source directory: ${sourceDir}`);
  console.info(`Output file: ${outputFile}`);
  
  try {
    const rpcData = processGoFiles(sourceDir);
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write JSON file
    fs.writeFileSync(outputFile, JSON.stringify(rpcData, null, 2));
    
    console.info('Conversion complete!');
    console.info(`Generated ${outputFile}`);
    
    // Print summary
    const stats = {
      namespaces: Object.keys(rpcData.namespaces).length,
      totalMethods: Object.values(rpcData.namespaces).reduce((acc, ns) => 
        acc + ns.interfaces.length + ns.implementations.length, 0),
      totalTypes: Object.keys(rpcData.types).length
    };
    
    console.info(`\nSummary:`);
    console.info(`- ${stats.namespaces} namespaces`);
    console.info(`- ${stats.totalMethods} methods`);
    console.info(`- ${stats.totalTypes} types`);
    
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

module.exports = {
  processGoFiles,
  parseGoInterface,
  parseGoImplementations,
  parseGoTypes
};