
import _ from 'lodash';

export function difference(a, b) {
  return _.reduce(
    a,
    function (result, value, key) {
      return _.isEqual(value, b[key]) ? result : result.concat(key);
    },
    []
  );
}
