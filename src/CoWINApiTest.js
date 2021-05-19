require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
});
require('@babel/register');
require('babel-polyfill');

const { useCoWINApi } = require('./CoWINDataAPI/CoWINDataAPI.js');
const api = useCoWINApi();
const { jsonify } = require('./utils/Jsonify.js');

api.on('load', () => {
  console.log("Loaded api!");
  //console.log(api.districts);

  api.getAppointmentByDistrict(77, '20-05-2021').then((result) => {
    console.log(jsonify(result));
  })
})