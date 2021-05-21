import _ from 'lodash';
import Observable from '../utils/Observable';

class AppointmentInMemoryStore extends Observable {
  constructor() {
    super();

    this.appointments = {};
    this.events.update = [];
  }

  update({ sessions, district_id }) {
    let changes = [];

    if (!sessions || sessions.length === 0) {
      this.appointments[district_id] = {};
      delete this.events.update[district_id];
    } else {
      const appointments = this.appointments[district_id];
      if (appointments) {
        sessions.forEach((session) => {
          const appointment = appointments[session.session_id];
          if (appointment) {
            if (!_.isEqual(session, appointment)) {
              changes.push(session);
            }
          }
        });
      } else {
        changes = [...changes, ...sessions];
      }
    }
    
    // Update changes
    this.appointments[district_id] = changes.reduce((acc, cur) => {
      acc[cur.session_id] = cur;
      return acc;
    }, {});
    
    this.fireEvent(this.events.update[district_id], {
      sessions: changes,
    });
    this.fireEvent(this.events.updateAny, {
      district_id,
      sessions: changes,
    })

    return changes;
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
