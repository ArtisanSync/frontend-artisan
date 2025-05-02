/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
    ],
  },

  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
