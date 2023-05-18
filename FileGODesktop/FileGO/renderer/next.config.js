module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    return config;
  },
  async rewrites() {
    return [
      // Other rewrites...

      // Rewrite API requests to /api/* to the /api endpoint
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};
