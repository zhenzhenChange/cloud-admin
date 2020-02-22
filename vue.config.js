module.exports = {
  devServer: {
    proxy: {
      "/cloud-admin-api": {
        changeOrigin: true,
        target: process.env.VUE_APP_API_URL,
        pathRewrite: { "^/cloud-admin-api": "/api" }
      }
    }
  },
  publicPath: process.env.VUE_APP_ROUTER_BASE
};
