// build-wrapper.mjs
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

// Function to patch built files after build
async function patchBuiltFiles() {
  const chunksDir = '.next/server/chunks'
  
  if (!fs.existsSync(chunksDir)) {
    console.log('No chunks directory found, skipping patch...')
    return
  }
  
  const files = fs.readdirSync(chunksDir).filter(f => f.endsWith('.js'))
  
  for (const file of files) {
    const filePath = path.join(chunksDir, file)
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false
    
    // Apply our patches
    const originalContent = content
    
    // Replace all 'data' in obj checks
    content = content.replace(
      /(['"]data['"])\s*in\s*([a-zA-Z_$][\w$]*)/g,
      (match, prop, varName) => {
        modified = true
        return `(${varName} && typeof ${varName} === 'object' && ${prop} in ${varName})`
      }
    )
    
    if (modified) {
      fs.writeFileSync(filePath, content)
      console.log(`Patched ${file}`)
    }
  }
}

// Main build process
async function build() {
  console.log('Starting Next.js build...')
  
  // Run the actual build
  const buildProcess = spawn('npx', ['next', 'build'], {
    stdio: 'inherit',
    shell: true
  })
  
  return new Promise((resolve, reject) => {
    buildProcess.on('close', async (code) => {
      if (code === 0) {
        console.log('Build completed, applying patches...')
        await patchBuiltFiles()
        console.log('Build process completed successfully')
        resolve(0)
      } else {
        console.error(`Build failed with code ${code}`)
        reject(code)
      }
    })
  })
}

build().catch(console.error)