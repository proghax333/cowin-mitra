import express from 'express';
import cors from 'cors';
import WebhookListenerServer from './WebhookListenerServer';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

WebhookListenerServer(app);

export const WebhookServer = {
  app : app,
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
