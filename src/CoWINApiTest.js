require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
});
require('@babel/register');
require('babel-polyfill');

const { useCoWINApi } = require('./CoWINDataAPI/CoWINDataAPI.js');
const { jsonify } = require('../lib/utils/Jsonify.js');

const api = useCoWINApi();

api.loadData();
api.on('load', () => {
  console.log("Loaded api!");
  console.log(api.states);
  console.log(api.districts);

  api.getAppointmentByDistrict(397, '21-05-2021').then((result) => {
    console.log(jsonify(result));
  })
})