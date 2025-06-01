/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
    },
    output: 'standalone',
};

export default nextConfig;
