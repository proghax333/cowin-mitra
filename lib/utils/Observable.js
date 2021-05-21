export default class Observable {
  constructor() {
    this.events = {};
  }

  on(event_type, callback, data) {}

  fireEvent(event_callbacks, data) {
    if (event_callbacks) {
      for (let callback of event_callbacks) {
        callback(data);
      }
    }
  }
}
