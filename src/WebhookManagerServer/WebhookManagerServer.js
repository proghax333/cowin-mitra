
import express from 'express';
import cors from 'cors';
import WebhookManagerAPI from './api/WebhookManagerAPI';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

WebhookManagerAPI(app);

app.listen(port, () => {
  console.log(`Started the server on port ${port}.`);
});