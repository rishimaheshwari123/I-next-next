/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "i.ibb.co",
            "images.unsplash.com",
            "www.krishaweb.com",
            "d1hdtc0tbqeghx.cloudfront.net"
        ]
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
