require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
});
require('@babel/register');
require('babel-polyfill');

const { WebhookManagerServer } = require('./WebhookManagerServer/WebhookManagerServer.js');

WebhookManagerServer.start();