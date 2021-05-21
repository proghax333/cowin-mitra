require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
});
require('@babel/register');
require('babel-polyfill');

const { WebhookManagerServer } = require('./WebhookManagerServer/WebhookManagerServer.js');
const { PollingService } = require('./PollingService/PollingService.js');

WebhookManagerServer.start();
PollingService.initialize();
PollingService.start();
