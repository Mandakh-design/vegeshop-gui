const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVICE_URL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api/v1/package": "", //remove /service/api
      // },
    })
  );
};
