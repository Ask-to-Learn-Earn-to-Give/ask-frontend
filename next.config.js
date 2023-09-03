/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "https://nftsontm.infura-ipfs.io/ipfs",
      "nftsontm.infura-ipfs.io",
    ],
  },
};

module.exports = nextConfig;
