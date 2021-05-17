
export class WebhookInMemoryDatabase {
  constructor() {
    this.webhooks = {};
  }
  insert(webhook) {
    this.webhooks[webhook.url] = webhook;
    return true;
  }
  update(webhook) {
    this.webhooks[webhook.url] = webhook;
    return true;
  }
  delete(webhook) {
    let hook = this.webhooks[webhook.url];
    if (typeof hook !== 'undefined') {
      delete this.webhooks[webhook.url];
      return true;
    }
    return false;
  }
  find(url) {
    // console.log(url, this.webhooks);
    return this.webhooks[url];
  }

  getAllUrls() {
    return this.webhooks.map((webhook) => {
      return webhook.url;
    });
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
    return this.database.delete(webhook);
  }
  find(url) {
    return this.database.find(url);
  }
  validate({ url, owner, password }) {
    const webhook = this.find(url);
    // console.log(webhook);

    if(webhook)
    {
      const validOwner = webhook.owner,
      validPassword = webhook.password;

      return owner == validOwner && password === validPassword;
    }
    return false;
  }
  getAllUrls() {
    return this.database.getAllUrls();
  }
}

function singletonStoreHelper()
{
  let instance = null;
  return () => {
    return instance || (instance = new WebhookStore());
  }
}

export const useWebhookStore = singletonStoreHelper();
