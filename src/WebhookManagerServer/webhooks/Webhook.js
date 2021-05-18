
export default class Webhook {
  constructor({ url = '', owner = '', password = '', district = '' }) {
    this.url = url;
    this.owner = owner;
    this.password = password;
    this.district = district;
  }
}
