'use strict';
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
// 定义函数判断是否是在当前生产环境，这个很重要，一位开发环境和生产环境配置上有一些区别
var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

// 定义输出文件夹
var outputDir = 'E:/working/zhaomi/test/client/Public/local/dist';
// 定义开发文件夹
var entryPath = 'E:/前端资源库/webpack-best-practice/app/views';
/** 定义插件
 *  CommonsChunkPlugin 插件会根据各个生成的模块中共用的模块，然后打包成一个common.js 文件。
 *  ProvidePlugin 插件可以定义一个共用的入口，比如 下面加的 React ,他会在每个文件自动require了react，所以你在文件中不需要 require('react')，也可以使用 React。
 */
var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'js/commons.js',
  })
 /* ,
  new webpack.ProvidePlugin({
    React: 'react',
    ReactDOM: 'react-dom',
    reqwest: 'reqwest',
  }),*/
];
if( isProduction() ) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  );
}

var entris = fs.readdirSync(entryPath).reduce(function (o, filename) {
    !/\./.test(filename) &&
    (o[filename] =  path.join(entryPath, filename, filename + '.jsx'));
    return o;
  }, {}
);

var config = {
  target: 'web',
  cache: true,
  entry: entris,
  output: {
    path: outputDir,
    filename: 'js/[name].bundle.js',
    publicPath: isProduction()? 'http://www.zm.com:8080/':'http://www.zm-admin.com:8080/admin/dist/',
    chunkFilename: isProduction() ? 'js/[name].chunk.js' : 'js/[name].chunk.min.js',
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loaders: ['babel?presets[]=es2015&presets[]=react'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?root='+__dirname, 'resolve-url', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url?limit=1024&name=img/[name].[ext]'
      },
      {
        test: /\.(woff2?|otf|eot|svg|ttf)$/i,
        loader: 'url?name=fonts/[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'file?name=views/[name].[ext]'
      },
    ]
  },
  plugins: plugins,
  externals: {
    "jquery": "jQuery",
    "react": "React",
    "react-dom":"ReactDOM",
    "PubSubJS":"PubSub",
    "webuploader":"webuploader",
    'ueditor.config':'ueditor.config',
    'ueditor.all':'ueditor.all',
    'zh-cn':'zh-cn',
    'ReactRouter':'ReactRouter'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: isProduction()?null:'source-map',
};

module.exports = config;
