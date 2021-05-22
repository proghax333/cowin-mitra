export const API_BASE_URL = 'https://cdn-api.co-vin.in/api';

export const routes = {
  GET_STATES: {
    url: '/v2/admin/location/states',
    name: 'Get states list',
  },
  GET_DISTRICTS_FROM_STATES: {
    url: '/v2/admin/location/districts',
    name: 'Get district list from state id',
    params: [
      { type: 'param', name: 'state_id', info: 'State ID' }
    ]
  },
  APPOINTMENT_FIND_BY_DISTRICT: {
    url: '/v2/appointment/sessions/public/findByDistrict',
    name: 'Get available vaccination centers by district id',
    params: [
      { type: 'query', name: 'district_id', info: 'District ID' },
      { type: 'query', name: 'date', info: 'Date to check the vaccination center details' },
    ],
  },
  APPOINTMENT_CALENDAR_BY_DISTRICT: {
    url: '/v2/appointment/sessions/public/calendarByDistrict',
    name: 'Get available vaccination center details for a week',
    params: [
      { type: 'query', name: 'district_id', info: 'District ID' },
      { type: 'query', name: 'date', info: 'Date to check the vaccination center details' },
    ],
  },
};
