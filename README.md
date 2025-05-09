# Cosmos EVM Documentation

Documentation portal for Cosmos EVM built with Next.js 15 and Nextra v4.

## Technical Setup

- **Framework**: Next.js 15.3.x with App Router
- **Documentation Engine**: Nextra v4
- **Styling**: Tailwind CSS v4
- **Node Version**: 18.x or later recommended

## Quick Start

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Lint the codebase
yarn lint
```

## Project Structure

```sh
├── app/                      # Next.js App Router files
│   └── [[...mdxPath]]/page.jsx  # MDX page renderer
├── content/                  # Documentation content (MDX files)
├── public/                   # Static assets
├── src/
│   ├── components/           # React components
│   └── utils/                # Utility functions
├── mdx-components.tsx        # MDX component customizations
├── next.config.mjs           # Next.js configuration
├── tailwind.config.mjs       # Tailwind CSS configuration
└── theme.config.tsx          # Nextra theme configuration
```

## Adding Content

1. **Add new pages** by creating `.mdx` files in the `content/` directory
2. **Organize navigation** by updating the `_meta.js` files
3. **Use components** by importing them directly in your MDX files

Example page:

```mdx
---
title: Introduction to Cosmos EVM
description: Overview of Ethereum Virtual Machine on Cosmos
---

# Introduction

This is a simple MDX page with **markdown** formatting.

<ChainInfo chain="cosmos-evm" />
```

## Development Notes

- Run `yarn lint` before committing to ensure code quality
- The project includes custom components in `src/components/` that can be used in MDX
- Configuration for Nextra is in `theme.config.tsx`
- Binary files (`.go`, `.zip`, etc.) in the content directory are ignored by webpack

## Deployment

The site is built as a static export and can be deployed to any static hosting provider.

```bash
yarn build
```
