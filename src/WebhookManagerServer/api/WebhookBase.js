
import { routes } from './Routes';
import { jsonify } from '../../utils/Jsonify';

export default function WebhookBase(app) {
  app.get(routes.BASE.url, (req, res) => {
    res.type('application/json').send(
      jsonify({
        status: 'success',
        message: 'Hello from CoWIN Mitra!',
      })
    );
  });
}