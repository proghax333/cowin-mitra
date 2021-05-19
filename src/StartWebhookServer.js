require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
});
require('@babel/register');
require('babel-polyfill');

const { WebhookServer } = require('./WebhookServer/WebhookServer.js');

WebhookServer.start();
