import { makeRequest } from '../../lib/utils/Request';
import { useSingleton } from '../../lib/utils/Singleton';
import { API_BASE_URL, routes } from './Routes';
import axios from 'axios';
import Observable from '../../lib/utils/Observable';

const config = {
  headers: {
    Accept: 'application/json',
    'User-Agent': 'A',
  },
};

export class CoWINDataAPI extends Observable {
  constructor() {
    super();

    this.routes = routes;
    this.isLoaded = false;
    this.events.load = [];
  }

  async loadData() {
    //await this.loadStates();
    //await this.loadDistricts();

    this.fireEvent(this.events.load);
    this.isLoaded = true;
  }

  async loadStates() {
    let states = await makeRequest(async () => {
      let response = axios.get(API_BASE_URL + routes.GET_STATES.url, config);
      return response;
    });

    this.states = states.states;
  }

  async getDistricts(state) {
    return makeRequest(async () => {
      let response = axios.get(
        API_BASE_URL + routes.GET_DISTRICTS_FROM_STATES.url + `/${state}`,
        config
      );
      return response;
    });
  }

  async loadDistricts() {
    let districts = {};
    
    if (this.states) {
      for (const state of this.states) {
        const data = await this.getDistricts(state.state_id);
        const state_districts = data.districts;
        
        state_districts?.forEach((district) => {
          districts[district.district_id] = district;
        });
      }
    }

    this.districts = districts;
  }

  async getAppointmentByDistrict(district, date) {
    let appointments = await makeRequest(async () => {
      let response = axios.get(
        API_BASE_URL +
          routes.APPOINTMENT_FIND_BY_DISTRICT.url +
          `?district_id=${district}&date=${date}`,
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
          this.events['load'] = [];
        } else {
          this.events['load'].push(callback);
        }
        break;
    }
  }
}

/* singleton */
export const useCoWINApi = useSingleton(CoWINDataAPI);
