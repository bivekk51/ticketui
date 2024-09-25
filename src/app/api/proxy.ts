import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
    api: {
        bodyParser: false,
    },
};

const API_URL = 'https://tixort.au/wp-json/tribe/tickets/v1/qr';

export default createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/tickets/qr': '',
    },
});
