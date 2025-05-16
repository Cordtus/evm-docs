// theme.config.tsx
const themeConfig = {
  logo: (
    <div className="flex items-center">
      <span className="font-bold text-xl mr-2">Cosmos EVM</span>
      <span className="text-orange-500">Docs</span>
    </div>
  ),
  project: {
    link: 'https://github.com/cosmos/cosmos-sdk',
  },
  docsRepositoryBase: 'https://github.com/cosmos/cosmos-sdk/blob/main/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Cosmos EVM Docs'
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Cosmos EVM Documentation" />
      <meta property="og:description" content="Official documentation for Cosmos Ethereum Virtual Machine (EVM)" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  darkMode: true,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: (
      <div className="flex justify-between w-full">
        <span>© {new Date().getFullYear()} Cosmos Network</span>
        <a 
          href="https://cosmos.network" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-orange-500 transition-colors"
        >
          Powered by Cosmos
        </a>
      </div>
    ),
  },
  chat: {
    link: 'https://discord.gg/cosmosnetwork',
  },
  toc: {
    float: true,
    title: "On This Page",
  },
  navigation: {
    prev: true,
    next: true,
  },
  editLink: {
    text: 'Edit this page on GitHub'
  },
  feedback: {
    content: 'Questions or feedback?'
  },
  search: {
    placeholder: 'Search documentation...'
  },
  primaryHue: {
    dark: 25,  // Orange hue in dark mode
    light: 25  // Orange hue in light mode
  }
};

export default themeConfig;