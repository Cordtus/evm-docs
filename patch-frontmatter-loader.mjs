// patch-frontmatter-loader.mjs
export default function patch(src) {
  // Add debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Patching webpack chunk for frontmatter...');
  }
  
  // Handle all variations of 'in' operator checks
  
  // Pattern 1: 'data' in obj
  src = src.replace(
    /'data'\s*in\s*([a-zA-Z_$][\w$]*)/g,
    (match, varName) => `(${varName} && typeof ${varName} === 'object' && 'data' in ${varName})`
  );
  
  // Pattern 2: 'data'in obj (no space, minified)
  src = src.replace(
    /'data'in\s*([a-zA-Z_$][\w$]*)/g,
    (match, varName) => `(${varName}&&typeof ${varName}==='object'&&'data'in ${varName})`
  );
  
  // Pattern 3: "data" in obj (double quotes)
  src = src.replace(
    /"data"\s*in\s*([a-zA-Z_$][\w$]*)/g,
    (match, varName) => `(${varName} && typeof ${varName} === 'object' && "data" in ${varName})`
  );
  
  // Pattern 4: "data"in obj (double quotes, no space)
  src = src.replace(
    /"data"in\s*([a-zA-Z_$][\w$]*)/g,
    (match, varName) => `(${varName}&&typeof ${varName}==='object'&&"data"in ${varName})`
  );
  
  // Pattern 5: Any property check with 'in' operator - be more general
  src = src.replace(
    /(['"])([\w$]+)\1\s*in\s*([a-zA-Z_$][\w$]*)/g,
    (match, quote, prop, varName) => {
      if (prop === 'data' || prop === 'endpoints') {
        return `(${varName} && typeof ${varName} === 'object' && ${quote}${prop}${quote} in ${varName})`;
      }
      return match;
    }
  );
  
  // Add more defensive checks for property access
  src = src.replace(
    /([a-zA-Z_$][\w$]*)\.data(?![a-zA-Z_$])/g,
    (match, varName) => `(${varName}?.data || {})`
  );
  
  src = src.replace(
    /([a-zA-Z_$][\w$]*)\.endpoints(?![a-zA-Z_$])/g,
    (match, varName) => `(${varName}?.endpoints || [])`
  );
  
  return src;
}