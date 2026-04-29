/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "i.ibb.co",
            "images.unsplash.com"
        ]
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
