
export default class Webhook {
  constructor({ url = '', owner = '', password = '' }) {
    this.url = url;
    this.owner = owner;
    this.password = password;
  }
}
