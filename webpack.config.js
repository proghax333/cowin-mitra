const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    "telegram-bot": ['@babel/polyfill', './src/StartTelegramBot.js'],
    "webhook-manager": ['@babel/polyfill', './src/StartWebhookManager.js'],
    "webhook-server": ['@babel/polyfill', './src/StartWebhookServer.js'],
    "appointment-test": ['@babel/polyfill', './src/AppointmentUtilsTest.js'],
    "cowin-api-test": ['@babel/polyfill', './src/CoWINApiTest.js'],
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
