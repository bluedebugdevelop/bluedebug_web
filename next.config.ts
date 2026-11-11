import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // www is an alias of the apex: 301, not the 308 that "permanent" gives.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bluedebug.com" }],
        destination: "https://bluedebug.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
