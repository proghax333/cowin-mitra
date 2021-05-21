import Webhook from '../../../lib/webhooks/Webhook';
import { useWebhookStore } from '../../../lib/webhooks/WebhookStore';
import { routes } from './Routes';
import { jsonify } from '../../../lib/utils/Jsonify';

export default function WebhookInsert(app) {
  const store = useWebhookStore();

  app.put(routes.ADD_WEBHOOK.url, (req, res) => {
    const data = req.body;
    const { url, owner, password, district } = data;

    if (url && owner && password && district) {
      if (!store.find({ url, district })) {
        store.insert(new Webhook(data));
        res.type('application/json').send(
          jsonify({
            status: 'success',
            message: 'Webhook added successfully!',
          })
        );
        // console.log(store);
      } else {
        res.type('application/json').send(
          jsonify({
            status: 'error',
            message: 'Webhook already added!',
          })
        );
      }
    } else {
      res
        .status(404)
        .type('application/json')
        .send(
          jsonify({
            status: 'error',
            message: 'Give proper data',
          })
        );
    }
  });
}
