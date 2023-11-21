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
    '/email',
    createProxyMiddleware({
      target: 'http://161.35.56.41:8083/dms/',
      changeOrigin: true,
      pathRewrite: {
        '^/email': '',
      },
      onProxyReq: (proxyReq) => {
        // Add your headers here
        proxyReq.setHeader('Connection', 'keep-alive');
      },
    })
  );
};
