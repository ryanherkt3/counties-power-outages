/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/getoutages',
                destination: 'https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns',
            },
        ]
    },
};

export default nextConfig;
