import withMDX from '@next/mdx'

const isGitHubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
    ...(isGitHubPages
        ? {
              output: 'export',
              basePath: '/Nilakshi_new_portfolio',
              trailingSlash: true,
              images: { unoptimized: true },
          }
        : {}),
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX()(nextConfig)