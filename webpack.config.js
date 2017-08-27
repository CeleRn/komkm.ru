'use strict';

// Зависимости
const webpack = require("webpack");
const path = require('path');

// Переменные
const NODE_ENV = process.env.NODE_ENV || 'development';

// Webpack плагины
const extractCSS = require("extract-text-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

// Настройка для SVGO-loader
let svgoConfig = JSON.stringify({
  plugins: [{
      removeTitle: true
  }, {
      convertColors: {
          shorthex: false
      }
  }, {
      convertPathData: true
  }]
});

module.exports = {
  context: path.join(__dirname, "assets"),

  entry: {
    commons: './commons'
  },
  output: {
    path: path.join(__dirname, "public"),
    publicPath: '/',
    filename: 'assets/js/[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', ".json", ".scss"]
  },
  resolveLoader: {
      modules: ["node_modules"],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
      moduleExtensions: ['-loader']
  },
  target: 'web',
  module: {
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      { // Javascript
        test: /\.js$/,
        include: [
          path.join(__dirname, "assets"),
          path.join(__dirname, "node_modules", "svg-sprite-loader", "lib", "plugin.js")
        ],
        use: "babel?presets[]=es2015"
      }, { // SCSS в файлы
          test: /\.(sass|scss)$/,
          use: extractCSS.extract({
            //resolve-url-loader may be chained before sass-loader if necessary
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules'),
                  path.resolve(__dirname, 'public', 'assets', 'css')
                ]
              }
            }]
          })
      }, { // CSS в файлы 
        test: /\.(css)$/,
        use: extractCSS.extract('css')
      },

      { // Картинки 
        test: /\.(png|jpg|svg|gif)$/,
        exclude: path.join(__dirname, "assets", "icons"),
        use: 'file?name=assets/images/[name].[ext]'
      }, { // Копируем шрифты
        test: /\.(ttf|eot|woff|woff2)$/,
        use: 'file?name=assets/fonts/[path][name].[ext]'
      }, {
        test: /\.svg$/,
        include: path.join(__dirname, "assets", "icons"),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'assets/icons/icons-sprite.svg'
            }
          }, {
            loader: 'svgo-loader?' + svgoConfig
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.NoEmitOnErrorsPlugin(),
    new extractCSS({
      filename: 'assets/css/[name].css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new SpriteLoaderPlugin()
  ]
};

