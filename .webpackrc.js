const config = {
  theme: "./theme.config.js",
  "hash": true,
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    },
    "production": {
      define: {
        "process.env.NODE_ENV": process.env.NODE_ENV,
        "process.env.SERVER_ENV": process.env.SERVER_ENV
      }
    }
  },
  "html": {
    "template": "./src/index.ejs"
  },
  "publicPath": "./",
}

export default config;
