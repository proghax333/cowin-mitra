const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    "StartTelegramBot": ['@babel/polyfill', './src/StartTelegramBot.js'],
    "StartWebhookManager": ['@babel/polyfill', './src/StartWebhookManager.js'],
    "StartWebhookServer": ['@babel/polyfill', './src/StartWebhookServer.js'],
    "AppointmentUtilsTest": ['@babel/polyfill', './src/AppointmentUtilsTest.js'],
    "CoWINApiTest": ['@babel/polyfill', './src/CoWINApiTest.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3.12,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
