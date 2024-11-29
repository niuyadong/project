const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  outputDir: "dist",
  publicPath: process.env.NODE_ENV === "production" ? "/vant-demo/" : "/",
  // px转rem
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 16, // 换算的基数16px = 1rem
            propList: ["*"],
          }),
        ],
      },
    },
  },
  // 图片压缩
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        // 配置项
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // 其他配置...
      })
      .end();
  },
  // 跨域环境配置
  configureWebpack: (config) => {
    if (process.env.VUE_APP_ENV === "development") {
      // 开发环境代理配置
      config.devServer = {
        proxy: {
          "/api": {
            target: "http://localhost:3000",
            changeOrigin: true, //是否跨域
            secure: false,
            pathRewrite: {
              "^/api": "/api", //需要rewrite重写的,
            },
          },
        },
      };
    } else if (process.env.VUE_APP_ENV === "production") {
      // 生产环境配置
      config.devServer = {
        proxy: {
          "/api": {
            target: "http://api.production.com",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
              "^/api": "/api", //需要rewrite重写的,
            },
          },
        },
      };
    } else if (process.env.VUE_APP_ENV === "test") {
      // 测试环境配置
      config.devServer = {
        proxy: {
          "/api": {
            target: "http://api.test.com",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
              "^/api": "/api", //需要rewrite重写的,
            },
          },
        },
      };
    }
  },
};
