import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-router-dom": path.resolve("./src/shims/react-router-dom.tsx"),
      "@": path.resolve("./src"),
    };
    return config;
  },
};

export default nextConfig;

