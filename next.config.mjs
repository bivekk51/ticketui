/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/tickets/qr', // Your custom API endpoint in the app
                destination: 'https://tixort.au/wp-json/tribe/tickets/v1/qr', // Actual API endpoint
            },
        ];
    },
};

export default nextConfig;
