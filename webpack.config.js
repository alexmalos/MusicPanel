const path = require('path');

const config = {
  context: __dirname,
  entry: './frontend/music_panel.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  return config;
}