
import express from 'express';
import cors from 'cors';
import WebhookListenerServer from './api/WebhookListenerServer';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

WebhookListenerServer(app);

app.listen(port, () => {
  console.log(`Started the server on port ${port}.`);
});
