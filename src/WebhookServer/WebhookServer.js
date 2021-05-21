import express from 'express';
import cors from 'cors';
import WebhookListenerServer from './WebhookListenerServer';
import { useAppointmentStore } from '../../lib/appointments/AppointmentStore';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

WebhookListenerServer(app);

export const WebhookServer = {
  app,
  isStarted: false,
  start: function () {
    if (!this.isStarted) {
      app.listen(port, () => {
        console.log(`Started the Webhook server on port ${port}.`);
        this.isStarted = true;
      });
    }
  },
};

const store = useAppointmentStore('centers');
store.on('updateAny', (data) => {
  console.log(data);
});
