/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    domains: ["randomuser.me"],
  },
  experimental: {
    // If you still want to enable/disable other flags, uncomment/edit below:
    // esmExternals: false,
    serverActions: {
      bodySizeLimit: "5mb",
    }, // <--- Enable Server Actions here
  },
};

export default nextConfig;
