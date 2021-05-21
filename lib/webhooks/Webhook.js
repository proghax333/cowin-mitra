
import axios from 'axios';

export default class Webhook {
  constructor({ url = '', owner = '', password = '', district = '' }) {
    this.url = url;
    this.owner = owner;
    this.password = password;
    this.district = district;
  }

  async send(data) {
    const payload = {
      district_id: this.district,
      data,
    };
    try {
      await axios.post(this.url, payload);
    } catch (err) {
      console.log(err);
    }
  }

  validate(credentials)
  {
    return credentials.owner === this.owner &&
      credentials.password === this.password;
  }
}
