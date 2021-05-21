import { makeRequest } from '../../lib/utils/Request';
import axios from 'axios';
import { useSingleton } from '../../lib/utils/Singleton';

class WebhookConnector {
  constructor(config) {
    this.config = new Webhook(config);
    config 
  }
  async subscribe(district_id) {
    this.config.district = district_id;
    await makeRequest(async () => {
      return axios.put(config.url, this.config);
    });
  }
  async unsubscribe(district_id) {
    this.config.district_id = district_id;
    await makeRequest(async () => {
      return axios.delete(config.url, this.config);
    });
  }
}

export const useWebhookConnector = useSingleton(WebhookConnector);
