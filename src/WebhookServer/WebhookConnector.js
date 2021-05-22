import { makeRequest } from '../../lib/utils/Request';
import axios from 'axios';

class WebhookConnector {
  constructor(config) {
    this.config = new Webhook(config);
  }
  configure(config)
  {
    this.config = config;
  }
  async subscribe(district_id) {
    this.config.district = district_id;
    await makeRequest(async () => {
      return axios.put(this.config.url, this.config);
    });
  }
  async unsubscribe(district_id) {
    this.config.district_id = district_id;
    await makeRequest(async () => {
      return axios.delete(this.config.url, this.config);
    });
  }
}

export const useWebhookConnector = (() => {
  let connector = null;
  return () => {
    return connector || (connector = new WebhookConnector());
  }
})
