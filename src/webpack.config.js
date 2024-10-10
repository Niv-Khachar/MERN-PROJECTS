const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Adjust this to your entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Adjust as needed
  },
  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'), // Polyfill for zlib
    },
  },
  plugins: [
    new NodePolyfillPlugin(), // Add the polyfill plugin
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Adjust based on your setup
        },
      },
      // Add other loaders as needed
    ],
  },
};


