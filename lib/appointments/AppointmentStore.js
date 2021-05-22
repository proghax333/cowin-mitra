import _ from 'lodash';
import Observable from '../utils/Observable';

class AppointmentInMemoryStore extends Observable {
  constructor() {
    super();

    this.appointments = {};
    this.events.update = [];
  }

  update({ district_id, sessions }) {
    let changes = [];

    if (!sessions || sessions.length === 0) {
      this.appointments[district_id] = {};
    } else {
      const appointments = this.appointments[district_id];
      if (appointments) {
        sessions.forEach((session) => {
          const appointment = appointments[session.session_id];
          if (!_.isEqual(session, appointment)) {
            changes.push(session);
          }
        });
      } else {
        changes = [...changes, ...sessions];
      }
    }

    // Update changes
    this.appointments[district_id] = changes.reduce((acc, session) => {
      acc[session.session_id] = session;
      return acc;
    }, {});

    if (changes.length > 0) {
      this.fireEvent(this.events.update[district_id], {
        sessions: changes,
      });
      this.fireEvent(this.events.updateAny, {
        district_id,
        sessions: changes,
      });
    }

    return changes;
  }

  reset() {
    this.appointments = {};
    this.fireEvent(this.events.reset, null);
  }

  on(event_type, callback, data) {
    switch (event_type) {
      case 'update':
        if (!this.events.update[data.district_id]) {
          this.events.update[data.district_id] = [callback];
        } else {
          this.events.update[data.district_id].push(callback);
        }
        break;
      case 'updateAny':
        if (!this.events.updateAny) {
          this.events.updateAny = [callback];
        } else {
          this.events.updateAny.push(callback);
        }
        break;
      case 'reset':
        if (!this.events.reset) {
          this.events.reset = [callback];
        } else {
          this.events.reset.push(callback);
        }
        break;
    }
  }
}

export const useAppointmentStore = (() => {
  const stores = {};
  return (name) => {
    if (!stores[name]) {
      stores[name] = new AppointmentInMemoryStore();
    }
    return stores[name];
  };
})();
