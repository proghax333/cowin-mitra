require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
});
require('@babel/register');
require('babel-polyfill');

const { difference } = require('../lib/utils/Difference.js');
const { useAppointmentStore } = require('../lib/appointments/AppointmentStore');

a = [
  {
    center_id: 563402,
    name: 'Bansilal Nagar UHC',
    address: 'Bansilal Nagar',
    state_name: 'Maharashtra',
    district_name: 'Aurangabad ',
    block_name: 'Aurangabad',
    pincode: 431001,
    from: '10:00:00',
    to: '16:00:00',
    lat: 19,
    long: 75,
    fee_type: 'Free',
    session_id: '2db97053-3274-4dd8-a533-55e94f348517',
    date: '21-05-2021',
    available_capacity_dose1: 0,
    available_capacity_dose2: 0,
    available_capacity: 0,
    fee: '0',
    min_age_limit: 45,
    vaccine: 'COVISHIELD',
    slots: [
      '10:00AM-11:00AM',
      '11:00AM-12:00PM',
      '12:00PM-01:00PM',
      '01:00PM-04:00PM',
    ],
  },
  {
    center_id: 696090,
    name: 'Ganesh Colony UHC (Covaxin)',
    address: 'Alamgir Colony Ganesh Colony Near Salim Ali Sarowar',
    state_name: 'Maharashtra',
    district_name: 'Aurangabad ',
    block_name: 'Aurangabad',
    pincode: 431001,
    from: '10:00:00',
    to: '16:00:00',
    lat: 19,
    long: 75,
    fee_type: 'Free',
    session_id: 'e949096e-fe3e-4ad3-8965-018e8799243c',
    date: '21-05-2021',
    available_capacity_dose1: 0,
    available_capacity_dose2: 0,
    available_capacity: 0,
    fee: '0',
    min_age_limit: 45,
    vaccine: 'COVAXIN',
    slots: [
      '10:00AM-11:00AM',
      '11:00AM-12:00PM',
      '12:00PM-01:00PM',
      '01:00PM-04:00PM',
    ],
  },
];

b = [
  {
    center_id: 563402,
    name: 'Bansilal Nagar UHC',
    address: 'Bansilal Nagar',
    state_name: 'Maharashtra',
    district_name: 'Aurangabad ',
    block_name: 'Aurangabad',
    pincode: 431001,
    from: '10:00:00',
    to: '16:00:00',
    lat: 19,
    long: 75,
    fee_type: 'Free',
    session_id: '2db97053-3274-4dd8-a533-55e94f348517',
    date: '21-05-2021',
    available_capacity_dose1: 0,
    available_capacity_dose2: 0,
    available_capacity: 0,
    fee: '0',
    min_age_limit: 45,
    vaccine: 'COVISHIELD',
    slots: [
      '10:00AM-11:00AM',
      '11:00AM-12:00PM',
      '12:00PM-01:00PM',
      '01:00PM-04:00PM',
    ],
  },
  {
    center_id: 696090,
    name: 'Ganesh Colony UHC (Covaxin)',
    address: 'Alamgir Colony Ganesh Colony Near Salim Ali Sarowar',
    state_name: 'Maharashtra',
    district_name: 'Aurangabad ',
    block_name: 'Aurangabad',
    pincode: 431001,
    from: '10:00:00',
    to: '16:00:00',
    lat: 19,
    long: 75,
    fee_type: 'Free',
    session_id: 'e949096e-fe3e-4ad3-8965-018e8799243c',
    date: '21-05-2021',
    available_capacity_dose1: 0,
    available_capacity_dose2: 0,
    available_capacity: 1,
    fee: '0',
    min_age_limit: 45,
    vaccine: 'COVAXIN',
    slots: [
      '10:00AM-11:00AM',
      '11:00AM-12:00PM',
      '12:00PM-01:00PM',
      '01:00PM-04:00PM',
    ],
  },
];

const store = useAppointmentStore('polling');
store.on(
  'update',
  (data) => {
    console.log("Data Changed!");
    console.log(data);
  },
  {
    district_id: 397,
  }
);

store.update({
  sessions: a,
  district_id: 397
});

store.update({
  sessions: b,
  district_id: 397
})

store.update({
  sessions: b,
  district_id: 397
})