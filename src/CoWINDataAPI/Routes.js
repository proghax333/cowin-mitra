
export const API_BASE_URL = 'https://cdn-api.co-vin.in/api';

export const routes = {
  GET_STATES: {
    url: '/v2/admin/location/states',
    name: 'Get states list',
  },
  GET_DISTRICTS_FROM_STATES: {
    url: '/v2/admin/location/districts',
    name: 'Get district list from state id',
  },
  APPOINTMENT_FIND_BY_DISTRICT: {
    url: '/v2/appointment/sessions/public/findByDistrict',
    name: 'Get available vaccination centers by district id',
  },
};