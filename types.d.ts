// types.d.ts
declare module 'estree' {}
declare module 'estree-jsx' {}
declare module 'geojson' {}
declare module 'hast' {}
declare module 'json-schema' {}
declare module 'mdast' {}
declare module 'mdx' {}
declare module 'nlcst' {}
declare module 'trusted-types' {}
declare module 'unist' {}

// Add declaration for @tailwindcss/postcss
declare module '@tailwindcss/postcss' {
  const plugin: any;
  export default plugin;
}