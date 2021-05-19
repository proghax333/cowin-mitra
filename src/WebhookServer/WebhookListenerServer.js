
import { jsonify } from '../utils/Jsonify';

export default function WebhookListenerServer(app) {
  app.post('/webhook', (req, res) => {
    const data = req.body;
    console.log(data);
    return res.type('application/json').send(
      jsonify({
        status: 'success',
      })
    )
  });
}
