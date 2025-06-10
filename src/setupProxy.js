// @ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://147.139.245.16:5055",
            changeOrigin: true,
        })
    );
};
