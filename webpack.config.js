require('dotenv').config()
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const DotenvWebpackPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const appPackage = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')))
const gitRev = require('git-rev-sync')
const gitPath = path.join(__dirname, '.git')
const lastCommit = fs.existsSync(gitPath) ? gitRev.short(gitPath) : ''
const isProduction = process.env.NODE_ENV === 'production'
const uglify = isProduction ? new webpack.optimize.UglifyJsPlugin() : () => {}
const hotModule = isProduction ? () => {} : new webpack.NamedModulesPlugin()
const hotModuleReplacement = isProduction ? () => {} : new webpack.HotModuleReplacementPlugin()

module.exports = {
  entry: {
    main: './src',
    components: './src/components',
    stores: './src/stores',
    services: './src/services',
    midlewares: './src/midlewares',
    utils: './src/utils'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules(?!\/webpack-dev-server)/
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
              publicPath: 'assets/images/'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'shared',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'VERSION': JSON.stringify(appPackage.version),
        'COMMIT': JSON.stringify(lastCommit)
      }
    }),
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'RSCH',
      template: path.resolve(__dirname, 'src/index.ejs'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    new CleanWebpackPlugin(['dist'], {}),
    uglify,
    hotModule,
    hotModuleReplacement
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: process.env.PORT,
    stats: 'errors-only',
    historyApiFallback: true,
    hot: true
  }
}