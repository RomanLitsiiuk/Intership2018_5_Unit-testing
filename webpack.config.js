const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
var _ = require('lodash');

const distPath = path.resolve(__dirname, 'dist');

function getJavaScriptLoaders() {
  if (process.env.NODE_ENV !== 'test') {
    return [
      {
        test: /\.js$/,
        loaders: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }],
        exclude: /node_modules/
      }
    ];
  } else {
    return [
      {
        test: /\.spec\.js$|\.mock\.js$/, // include only mock and test files
        loaders: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {esModules: true}
        },
        exclude: /node_modules|\.spec.js$|\.mock\.js$/ // exclude node_modules and test files
      }
    ];
  }
}

module.exports = (env, config) => ({
  // entry: './src/js/app.js',
  entry: {
    main: './src/js/app.js'
    /*'pages/products-page/some': './src/pages/products-page/main.js',
    'pages/product-page/main': './src/pages/product-page/main.js'*/
  },
  output: {
    path: distPath,
    filename: '[name].js'
  },
  module: {
    rules: _.union(
      getJavaScriptLoaders(),
      [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            // 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                publicPath: distPath,
                plugins: [
                  config.mode === 'production' ? cssnano : () => {
                  },
                  autoprefixer({
                    browsers: ['last 2 versions']
                  })
                ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              name: '[path]/[name].[ext]'
            }
          }]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '../../images/'
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70
              }
            }
          }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '../../'
            }
          }
        }])
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true,
    open: true
  }
});
