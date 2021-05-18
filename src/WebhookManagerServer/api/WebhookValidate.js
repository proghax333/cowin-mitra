
import Webhook from '../webhooks/Webhook';
import { useWebhookStore } from '../webhooks/WebhookStore';
import { routes } from './Routes';
import { jsonify } from '../../utils/Jsonify';

export default function WebhookValidate(app) {
  const store = useWebhookStore();

  app.post(routes.VALIDATE_WEBHOOK.url, (req, res) => {
    const data = req.body;
    const webhook = new Webhook(data);

    if (store.validate(webhook)) {
      res.type('application/json').send(
        jsonify({
          status: 'success',
          message: 'Credentials are valid.',
        })
      );
    } else {
      res.type('application/json').send(
        jsonify({
          status: 'error',
          message: 'Invalid credentials supplied. Could not validate webhook.',
        })
      );
    }
  });
}