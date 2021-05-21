
import { useSingleton } from '../utils/Singleton';
import Webhook from './Webhook';

export class WebhookInMemoryDatabase {
  constructor() {
    this.webhooks = {};
  }
  insert(webhook) {
    if (!this.webhooks[webhook.district]) {
      this.webhooks[webhook.district] = [];
    }
    this.webhooks[webhook.district].push(webhook);
    return true;
  }
  update(webhook) {
    if (!this.webhooks[webhook.district]) {
      this.webhooks[webhook.district] = [];
    }
    this.webhooks[webhook.district].push(webhook);
    return true;
  }
  delete(webhook) {
    let hooks = this.webhooks[webhook.district];
    if (hooks) {
      this.webhooks[webhook.district] = hooks.filter(
        (hook) => hook.url !== webhook.url
      );
      return true;
    }
    return false;
  }
  find({ district, url }) {
    // console.log(url, this.webhooks);
    const hooks = this.webhooks[district];
    if (hooks) {
      return hooks.find((hook) => hook.url === url);
    }
    return false;
  }
  all()
  {
    return this.webhooks;
  }
}

class WebhookStore {
  static database = null;

  constructor() {
    this.database = new WebhookInMemoryDatabase();
  }
  insert(webhook) {
    return this.database.insert(webhook);
  }
  delete(webhook) {
    if (this.validate(webhook)) {
      return this.database.delete(webhook);
    }
    return false;
  }
  find(data) {
    return this.database.find(data);
  }
  validate(credentials) {
    const { url, district } = credentials;
    const webhook = new Webhook(this.database.find({ url, district }));

    return webhook && webhook.validate(credentials);
  }
  all()
  {
    return this.database.all();
  }
}

export const useWebhookStore = useSingleton(WebhookStore);
