const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.transfermelon.com/index.php/v1/api/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: (proxyReq) => {
        // Add your headers here
        proxyReq.setHeader('Connection', 'keep-alive');
      },
    })
  );

  app.use(
    '/imgs',
    createProxyMiddleware({
      target: 'https://api.transfermelon.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/imgs': '',
      },
      onProxyReq: (proxyReq) => {
        // Add your headers here
        proxyReq.setHeader('Connection', 'keep-alive');
      },
    })
  );
};
