import { WebhookManagerServer } from './WebhookManagerServer/WebhookManagerServer.js';
import { CoWINApiPoller } from './PollingService/PollingService.js';
import { useAppointmentStore } from '../lib/appointments/AppointmentStore.js';
import { useWebhookStore } from '../lib/webhooks/WebhookStore';

WebhookManagerServer.start();

const store = useAppointmentStore('polling');
const webhookStore = useWebhookStore();

store.on('updateAny', ({ district_id, sessions }) => {
  const hooks = webhookStore.all()[district_id];
  if (hooks) {
    for (const hook of hooks) {
      hook && hook.send(sessions);
    }
  }
});

CoWINApiPoller.setIntervalTime(5000);
CoWINApiPoller.initialize();
