
import { WebhookManagerServer } from './WebhookManagerServer/WebhookManagerServer.js';
import { PollingService } from './PollingService/PollingService.js';

WebhookManagerServer.start();
PollingService.initialize();
PollingService.start();
