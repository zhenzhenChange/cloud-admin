module.exports = {
  devServer: {
    proxy: {
      "/cloud-admin-api": {
        changeOrigin: true,
        target: "http://39.108.132.32:8080",
        pathRewrite: { "^/cloud-admin-api": "/api" }
      }
    }
  },
  publicPath: "/cloud-admin/"
};
