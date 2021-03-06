/// Requires
const webpack = require('webpack');
const pkg = require('./package.json');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/// Environment
const env = process.env.NODE_ENV || 'dev';
const distPath = __dirname + '/lib';
const srcPath = __dirname + '/src';

/// Library info
const library = 'Shell';
const filename = library.toLowerCase();
const banner = `${pkg.name} - ${pkg.description}
Author: ${pkg.author}
Version: v${pkg.version}
URL: ${pkg.homepage}
License(s): ${pkg.license}`;
let outputFilename = `${filename}.js`;

/// Plugins
let plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer(),
      ]
    }
  })
];

/// If is build environment
if (env === 'build') {
  plugins.push(new UglifyJsPlugin({
    minimize:  true,
    sourceMap: true,
    mangle:    {
      except: ['Shell']
    },
    output: {
      comments: false
    }
  }));
  outputFilename = `${filename}.min.js`;
}

/// Add banner
plugins.push(new webpack.BannerPlugin(banner));

/// Export Webpack config
module.exports = {
  devtool: 'nosources-source-map',
  entry:   [`${srcPath}/sass/${filename}.scss`, `${srcPath}/js/${filename}.js`],
  output:  {
    path:           distPath,
    filename:       outputFilename,
    library,
    libraryTarget:  'umd',
    umdNamedDefine: true
  },
  module:  {
    rules: [
      {
        test:    /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use:     'babel-loader'
      }, {
        test: /\.scss$/,
        use:  [
          'universal-style-loader',
          'css-loader',
          {
            loader:  'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
          },
          'sass-loader'
        ]
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use:  {
          loader:  'url-loader',
          options: {
            limit: 10000,
            name:  'assets/fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins
};