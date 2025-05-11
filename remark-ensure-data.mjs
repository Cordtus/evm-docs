// remark-ensure-data.mjs
export default function remarkEnsureData() {
  return (_, file) => {
    // Ensure file.data exists
    if (!file.data) {
      file.data = {};
    }
    
    // Ensure frontMatter exists
    if (!file.data.frontMatter) {
      file.data.frontMatter = {};
    }
    
    const fm = file.data.frontMatter;
    
    // Ensure all required frontmatter fields exist with safe defaults
    if (typeof fm.data === 'undefined') fm.data = {};
    if (typeof fm.endpoints === 'undefined') fm.endpoints = [];
    if (typeof fm.title === 'undefined') fm.title = '';
    if (typeof fm.description === 'undefined') fm.description = '';
    
    // Ensure data is always an object
    if (fm.data === null || typeof fm.data !== 'object') {
      fm.data = {};
    }
    
    // Ensure endpoints is always an array
    if (!Array.isArray(fm.endpoints)) {
      fm.endpoints = [];
    }
    
    file.data.frontMatter = fm;
  }
}