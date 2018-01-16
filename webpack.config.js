const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = {
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  target: 'web',
};
module.exports = [
  {
    entry: {
      'react-adjustable-gauge': './src/index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename:
        process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
      library: {
        root: 'ReactAdjustableGauge',
        commonjs: 'react-adjustable-gauge',
        amd: 'react-adjustable-gauge',
      },
      libraryTarget: 'umd',
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
      'prop-types': {
        commonjs: 'prop-types',
        commonjs2: 'prop-types',
        amd: 'PropTypes',
        root: 'PropTypes',
      },
      'react-konva': {
        commonjs: 'react-konva',
        commonjs2: 'react-konva',
        amd: 'ReactKonva',
        root: 'ReactKonva',
      },
      konva: {
        commonjs: 'konva',
        commonjs2: 'konva',
        amd: 'Konva',
        root: 'Konva',
      },
    },
    ...commonConfig,
  },
];
if (process.env.NODE_ENV !== 'production') {
  module.exports.unshift({
    entry: './example/index.js',
    output: {
      path: path.join(__dirname, 'example/dist'),
      filename: 'example.js',
      publicPath: './',
    },
    ...commonConfig,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/example/index.html'),
        filename: 'index.html',
        inject: 'body',
      }),
    ],
  });
}
