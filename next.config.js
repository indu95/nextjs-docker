const serverConfig = require('./server_config').getProperties()
const { REGION = 'in', NODE_ENV = 'development' } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/stub/:path*',
        destination: 'http://localhost:3001/:path*' // Proxy to Backend
      }
    ]
  },
  images: {
    domains: [],
    loader: 'custom'
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    ...serverConfig
  }
}

module.exports = async (phase) => {
  // No transpilation happens here, hence use only nodejs supported features
  // Setup app cache if needed
  // For making api calls use axios
  nextConfig.env.country = REGION
  nextConfig.env.appEnv = NODE_ENV
  global.name = 'indu'
  return nextConfig
}
