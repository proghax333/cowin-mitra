import express from 'express';
import cors from 'cors';
import WebhookManagerAPI from './api/WebhookManagerAPI';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

WebhookManagerAPI(app);

export const WebhookManagerServer = {
  app,
  isStarted: false,
  start: function() {
    if (!this.isStarted) {
      app.listen(port, () => {
        console.log(`Started the Webhook Manager server on port ${port}.`);
        this.isStarted = true;
      });
    }
  },
};
