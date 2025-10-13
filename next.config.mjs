/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

// const withMDX = createMDX({
//   // Add markdown plugins here, as desired
// });

// // Merge MDX config with Next.js config
// export default withMDX(nextConfig);

// export default nextConfig;

export default async function config() {
  if (process.env.ANALYZE === 'true') {
    const { default: withBundleAnalyzer } = await import('@next/bundle-analyzer');
    const finalConfig = withBundleAnalyzer({
      enabled: true,
      openAnalyzer: true, // ✅ Automatically open in browser
    })(nextConfig);

    return finalConfig;
  }

  return nextConfig;
}
