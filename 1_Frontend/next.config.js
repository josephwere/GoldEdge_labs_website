/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({ dest: 'public', register: true, skipWaiting: true });
module.exports = withPWA({
  reactStrictMode: true,
  experimental: { appDir: true },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://goldedge-backend.onrender.com'
  }
});
