import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    // Yerel /public/images altındaki görseller; standalone imajı hafif tutmak
    // için Next image optimizer'ı devre dışı (sharp bağımlılığı gerektirmez).
    unoptimized: true,
  },
};

export default nextConfig;
