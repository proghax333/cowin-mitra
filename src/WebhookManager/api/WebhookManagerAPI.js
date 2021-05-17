
import WebhookInsert from './WebhookInsert';
import WebhookValidate from './WebhookValidate';
import WebhookRemove from './WebhookRemove';
import WebhookBase from './WebhookBase';

export default function WebhookManagerAPI(app) {
  WebhookBase(app);
  WebhookInsert(app);
  WebhookValidate(app);
  WebhookRemove(app);
}
