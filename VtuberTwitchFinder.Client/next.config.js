/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static-cdn.jtvnw.net',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.7tv.app',
                port: '',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
