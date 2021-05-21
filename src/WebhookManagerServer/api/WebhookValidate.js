import Webhook from '../../../lib/webhooks/Webhook';
import { useWebhookStore } from '../../../lib/webhooks/WebhookStore';
import { routes } from './Routes';
import { jsonify } from '../../../lib/utils/Jsonify';

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