
import { jsonify } from '../../lib/utils/Jsonify';
import CoWINHandler from './CoWINHandler'

export default function WebhookListenerServer(app) {
  app.post('/webhook', (req, res) => {
    const payload = req.body;
    CoWINHandler(payload.data);

    return res.type('application/json').send(
      jsonify({
        status: 'success',
      })
    )
  });
}
