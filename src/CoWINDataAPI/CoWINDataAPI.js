import { useSingleton } from '../utils/Singleton';
import { makeRequest } from '../utils/Request';
import { API_BASE_URL, routes } from './Routes';
import axios from 'axios';

const config = {
  headers: {
    Accept: 'application/json',
    'User-Agent': 'A',
  },
};

export class CoWINDataAPI {
  constructor() {
    this.routes = routes;
    this.isLoaded = false;
    this.events = {
      load: [],
    };
  }

  async loadData() {
    let { states } = await this.loadStates();

    let state_districts = {};
    if (states) {
      for (const state of states) {
        // let state = states[0];
        const { districts } = await this.loadDistrictsFromState(state.state_id);
        state_districts[state.state_id] = districts;
      }
    }

    this.states = states;
    this.districts = state_districts;

    this.fireEvent('load');
    this.isLoaded = true;
  }

  async loadStates() {
    let states = await makeRequest(async () => {
      let response = axios.get(API_BASE_URL + routes.GET_STATES.url, config);
      return response;
    });
    return states;
  }

  async loadDistrictsFromState(state) {
    let districts = await makeRequest(async () => {
      let response = axios.get(
        API_BASE_URL + routes.GET_DISTRICTS_FROM_STATES.url + `/${state}`,
        config
      );
      return response;
    });
    return districts;
  }

  async getAppointmentByDistrict(district, date) {
    let appointments = await makeRequest(async () => {
      let response = axios.get(
        API_BASE_URL + routes.APPOINTMENT_FIND_BY_DISTRICT.url + `?district_id=${district}&date=${date}`,
        config
      );
      return response;
    });
    return appointments;
  }

  on(event_type, callback) {
    switch (event_type) {
      case 'load':
        if (this.isLoaded) {
          callback();
          this.events.load = {};
        } else {
          this.events.load.push(callback);
        }
        break;
    }
  }

  fireEvent(event_type) {
    if (this.events[event_type]) {
      for (const callback of this.events[event_type]) {
        callback();
      }
    }
  }
}

export const useCoWINApi = (function () {
  let instance = null;

  return () => {
    if (!instance) {
      instance = new CoWINDataAPI();
      instance.loadData();
    }
    return instance;
  };
})();
