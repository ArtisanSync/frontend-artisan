/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
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
