
import { useSingleton } from '../../utils/Singleton';

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
  validate({ url, owner, password, district }) {
    const webhook = this.find({ url, district });
    // console.log(webhook);

    if (webhook) {
      const validOwner = webhook.owner;
      const validPassword = webhook.password;
      const validDistrict = webhook.district;

      return (
        owner == validOwner &&
        password === validPassword &&
        district === validDistrict
      );
    }
    return false;
  }
}

export const useWebhookStore = useSingleton(WebhookStore);
