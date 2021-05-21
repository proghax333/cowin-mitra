import Webhook from '../../../lib/webhooks/Webhook';
import { useWebhookStore } from '../../../lib/webhooks/WebhookStore';
import { routes } from './Routes';
import { jsonify } from '../../../lib/utils/Jsonify';

export default function WebhookRemove(app) {
  const store = useWebhookStore();

  app.delete(routes.REMOVE_WEBHOOK.url, (req, res) => {
    const data = req.body;
    const webhook = new Webhook(data);

    if (store.delete(webhook)) {
      res.type('application/json').send(
        jsonify({
          status: 'success',
          message: 'Successfully deleted webhook!',
        })
      );
    } else {
      res.type('application/json').send(
        jsonify({
          status: 'error',
          message: 'Invalid credentials supplied. Could not delete webhook.',
        })
      );
    }
  });
}
