/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Monaco Editor webpack configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    return config;
  },
  // Suppress hydration warnings for Monaco Editor
  reactStrictMode: true,
};

export default nextConfig;